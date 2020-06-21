import { injectable, inject } from 'tsyringe';

import IGamesRepository from '../database/repositories/interfaces/IGamesRepository';
import LogGame from '../utils/LogGame';

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
  ) {}

  public async execute(linesCommands: ICommand[]): Promise<void> {
    try {
      this.clearDataBase();
      let game = 0;
      const players: IPlayer[] = [];
      const kills: IKill[] = [];

      (await linesCommands).forEach(lineCommand => {
        switch (lineCommand.lineCommand) {
          case 'InitGame':
            game += 1;
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
            const kill = this.getKill(game, lineCommand.lineValue);
            if (
              kill &&
              !kills.find(
                element =>
                  element.game === kill.game &&
                  element.playerKill === kill.playerKill &&
                  element.playerKilled === kill.playerKilled &&
                  element.mod === kill.mod,
              )
            ) {
              kills.push(kill);
            }
            break;
          }

          default:
            break;
        }
      });
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

  public getKill(game: number, lineValue: string): IKill | undefined {
    let kill: IKill | undefined;
    const commandPattern: string | undefined = process.env.KILL_PATTERN;
    const regExp = new RegExp(commandPattern || '');
    const lineMatch = lineValue.match(regExp);

    if (lineMatch) {
      const logGame = new LogGame();
      const playerKill = lineMatch[1];
      const playerKilled = lineMatch[2];
      const mod = lineMatch[3];
      kill = {
        game,
        playerKill,
        playerKilled,
        mod,
        log: logGame.treatLog(playerKill, playerKilled, mod),
      };
    }
    return kill;
  }

  public async createParseGame(): Promise<void> {
    await this.gamesRepository.create({
      game: 1,
      total_kills: 1,
      players: JSON,
      kills: JSON,
      log: JSON,
    });
  }

  public async clearDataBase(): Promise<void> {
    await this.gamesRepository.clear();
  }
}

export default CreateGameService;
