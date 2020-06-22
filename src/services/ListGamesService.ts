import { injectable, inject } from 'tsyringe';

import IGamesRepository from '../database/repositories/interfaces/IGamesRepository';

import Game from '../database/entities/Game';

@injectable()
class ListGamesService {
  constructor(
    @inject('GamesRepository')
    private gamesRepository: IGamesRepository,
  ) {}

  public async execute(): Promise<Game[]> {
    try {
      const games = this.gamesRepository.findAllGames();

      return games;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default ListGamesService;
