import { injectable, inject } from 'tsyringe';

import IGamesRepository from '../database/repositories/interfaces/IGamesRepository';

import Game from '../database/entities/Game';
import AppError from '../errors/AppError';

@injectable()
class ListGamesService {
  constructor(
    @inject('GamesRepository')
    private gamesRepository: IGamesRepository,
  ) {}

  public async execute(game: string): Promise<Game | undefined> {
    const oneGame = await this.gamesRepository.findGame(parseInt(game, 10));

    if (!oneGame) {
      throw new AppError(`Game ${game} not found`, 404);
    }

    return oneGame;
  }
}

export default ListGamesService;
