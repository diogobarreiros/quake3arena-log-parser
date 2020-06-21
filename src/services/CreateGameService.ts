import { injectable, inject } from 'tsyringe';

import IGamesRepository from '../database/repositories/interfaces/IGamesRepository';

interface ICommand {
  lineCommand: string;
  lineValue: string;
}

interface Player {
  game: number;
  playerCode: number;
  playerName: string;
  kills: number;
}

@injectable()
class CreateGameService {
  constructor(
    @inject('GamesRepository')
    private gamesRepository: IGamesRepository,
  ) {}

  public async execute(linesCommands: Promise<ICommand[]>): Promise<void> {
    try {
      this.clearDataBase();
      let game = 0;
      const players: Player[] = [];

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

  public getPlayer(game: number, lineValue: string): Player | undefined {
    let player: Player | undefined;
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
