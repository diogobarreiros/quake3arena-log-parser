import { injectable, inject } from 'tsyringe';

import IPlayersRepository from '../database/repositories/interfaces/IPlayersRepository';
import ICreatePlayerDTO from '../dtos/ICreatePlayerDTO';

interface ICommand {
  lineCommand: string;
  lineValue: string;
}

@injectable()
class CreateGameService {
  constructor(
    @inject('PlayersRepository')
    private playersRepository: IPlayersRepository,
  ) {}

  public async execute(linesCommands: Promise<ICommand[]>): Promise<void> {
    try {
      this.clearDataBase();
      let game = 0;
      const players: ICreatePlayerDTO[] = [];

      (await linesCommands).forEach(lineCommand => {
        switch (lineCommand.lineCommand) {
          case 'InitGame':
            game += 1;
            break;

          case 'ClientUserinfoChanged': {
            const commandPattern: string | undefined =
              process.env.PLAYER_PATTERN;
            const regExp = new RegExp(commandPattern || '');
            const lineMatch = lineCommand.lineValue.match(regExp);
            if (lineMatch) {
              const player: ICreatePlayerDTO = {
                game,
                playerCode: parseInt(lineMatch[1], 10),
                playerName: lineMatch[2],
                kills: 0,
              };
              if (
                !players.find(
                  element =>
                    element.game === player.game &&
                    element.playerCode === player.playerCode,
                )
              ) {
                players.push(player);
                this.createParsePlayer(player);
              }
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

  public async createParsePlayer(player: ICreatePlayerDTO): Promise<void> {
    await this.playersRepository.create(player);
  }

  public async clearDataBase(): Promise<void> {
    await this.playersRepository.clear();
  }
}

export default CreateGameService;
