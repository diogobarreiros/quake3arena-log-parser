import { getMongoRepository, MongoRepository } from 'typeorm';

import ICreateGameDTO from '../../dtos/ICreateGameDTO';
import IGamesRepository from './interfaces/IGamesRepository';

import Game from '../entities/Game';

class GamesRepository implements IGamesRepository {
  private ormRepository: MongoRepository<Game>;

  constructor() {
    this.ormRepository = getMongoRepository(Game);
  }

  public async clear(): Promise<void> {
    await this.ormRepository.clear();
  }

  public async create({
    game,
    total_kills,
    players,
    kills,
    log,
  }: ICreateGameDTO): Promise<Game> {
    const player = this.ormRepository.create({
      game,
      total_kills,
      players,
      kills,
      log,
    });

    await this.ormRepository.save(player);

    return player;
  }
}

export default GamesRepository;
