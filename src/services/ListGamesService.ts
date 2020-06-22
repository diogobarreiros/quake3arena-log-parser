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

  public async execute(): Promise<Game[]> {
    const games = await this.gamesRepository.findAllGames();

    if (games.length < 1) {
      throw new AppError('Games not found', 404);
    }

    return games;
  }
}

export default ListGamesService;
