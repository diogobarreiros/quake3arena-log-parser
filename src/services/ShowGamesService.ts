import { injectable, inject } from 'tsyringe';

import IGamesRepository from '../database/repositories/interfaces/IGamesRepository';

import Game from '../database/entities/Game';

@injectable()
class ListGamesService {
  constructor(
    @inject('GamesRepository')
    private gamesRepository: IGamesRepository,
  ) {}

  public async execute(game: string): Promise<Game | undefined> {
    try {
      const oneGame = this.gamesRepository.findGame(parseInt(game, 10));

      return oneGame;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default ListGamesService;
