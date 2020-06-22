import { injectable, inject } from 'tsyringe';
import path from 'path';

import ICreateGameDTO from '../dtos/ICreateGameDTO';
import IGamesRepository from '../database/repositories/interfaces/IGamesRepository';

import LogGame from '../utils/LogGame';
import ReadFile from '../utils/ReadFile';

import uploadConfig from '../config/upload';

import IStorageLog from '../container/logs/StorageLog/models/IStorageLog';

interface ICommand {
  lineCommand: string;
  lineValue: string;
}

interface IPlayer {
  game: number;
  playerCode: number;
  playerName: string;
  kills: number;
}

interface IKill {
  game: number;
  playerKill: string;
  playerKilled: string;
  mod: string;
  log: string;
}

@injectable()
class CreateGameService {
  constructor(
    @inject('GamesRepository')
    private gamesRepository: IGamesRepository,

    @inject('StorageLog')
    private storageLog: IStorageLog,
  ) {}

  public async execute(fileName: string): Promise<void> {
    try {
      const file = await this.storageLog.saveFile(fileName);

      const readFile = new ReadFile();
      const lines = await readFile.readLogFile(
        path.resolve(uploadConfig.uploadsFolder, file),
      );
      const commandPattern: string | undefined = process.env.COMMAND_PATTERN;
      const linesCommands = readFile.parseLines(
        lines,
        new RegExp(commandPattern || ''),
      );

      this.clearDataBase();
      const games: number[] = [];
      let game = 0;
      const players: IPlayer[] = [];
      const kills: IKill[] = [];

      (await linesCommands).forEach(lineCommand => {
        switch (lineCommand.lineCommand) {
          case 'InitGame':
            game += 1;
            games.push(game);
            break;

          case 'ClientUserinfoChanged': {
            const player = this.getPlayer(game, lineCommand.lineValue);
            if (
              player &&
              !players.find(
                element =>
                  element.game === player.game &&
                  element.playerCode === player.playerCode,
              )
            ) {
              players.push(player);
            }
            break;
          }

          case 'Kill': {
            const kill = this.getKill(game, lineCommand.lineValue, players);
            if (kill) {
              kills.push(kill);
            }
            break;
          }

          default:
            break;
        }
      });

      this.createParseGame(players, kills, games);
    } catch (err) {
      throw new Error(err);
    }
  }

  public getPlayer(game: number, lineValue: string): IPlayer | undefined {
    let player: IPlayer | undefined;
    const commandPattern: string | undefined = process.env.PLAYER_PATTERN;
    const regExp = new RegExp(commandPattern || '');
    const lineMatch = lineValue.match(regExp);
    if (lineMatch) {
      player = {
        game,
        playerCode: parseInt(lineMatch[1], 10),
        playerName: lineMatch[2],
        kills: 0,
      };
    }
    return player;
  }

  public getPlayerName(
    playerCode: number,
    players: IPlayer[],
  ): string | undefined {
    return players.find(element => element.playerCode === playerCode)
      ?.playerName;
  }

  public getKill(
    game: number,
    lineValue: string,
    players: IPlayer[],
  ): IKill | undefined {
    let kill: IKill | undefined;
    const commandPattern: string | undefined = process.env.KILL_PATTERN;
    const regExp = new RegExp(commandPattern || '');
    const lineMatch = lineValue.match(regExp);

    if (lineMatch) {
      const logGame = new LogGame();
      const playerKill =
        this.getPlayerName(parseInt(lineMatch[1], 10), players) || '<world>';
      const playerKilled =
        this.getPlayerName(parseInt(lineMatch[2], 10), players) || '<world>';
      const mod = lineMatch[3];
      kill = {
        game,
        playerKill,
        playerKilled,
        mod,
        log: logGame.treatLog(playerKill, playerKilled, mod),
      };
      if (playerKill !== '<world>')
        players.forEach(element => {
          const player = element;
          if (
            player.game === game &&
            player.playerCode === parseInt(lineMatch[2], 10)
          )
            player.kills += 1;
        });
    }
    return kill;
  }

  public getKillsGame(game: number, kills: IKill[]): IKill[] {
    return kills.filter(element => element.game === game);
  }

  public getPlayersGame(game: number, players: IPlayer[]): IPlayer[] {
    return players.filter(element => element.game === game);
  }

  public async createParseGame(
    players: IPlayer[],
    kills: IKill[],
    games: number[],
  ): Promise<void> {
    const gamesQuake: ICreateGameDTO[] = [];
    for (let game = 1; game <= games.length; game += 1) {
      const gameQuake: ICreateGameDTO = {
        game,
        total_kills: this.getKillsGame(game, kills).length,
        players: JSON.parse(JSON.stringify(this.getPlayersGame(game, players))),
        kills: JSON.parse(JSON.stringify(this.getKillsGame(game, kills))),
      };
      gamesQuake.push(gameQuake);
    }
    await this.gamesRepository.insertMany(gamesQuake);
  }

  public async clearDataBase(): Promise<void> {
    await this.gamesRepository.clear();
  }
}

export default CreateGameService;
