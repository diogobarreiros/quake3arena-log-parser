import { getMongoRepository, MongoRepository } from 'typeorm';

import ICreatePlayerDTO from '../../dtos/ICreatePlayerDTO';
import IPlayersRepository from './interfaces/IPlayersRepository';

import Player from '../entities/Player';

class PlayersRepository implements IPlayersRepository {
  private ormRepository: MongoRepository<Player>;

  constructor() {
    this.ormRepository = getMongoRepository(Player);
  }

  public async clear(): Promise<void> {
    await this.ormRepository.clear();
  }

  public async create({
    game,
    playerCode,
    playerName,
    kills,
  }: ICreatePlayerDTO): Promise<Player> {
    const player = this.ormRepository.create({
      game,
      playerCode,
      playerName,
      kills,
    });

    await this.ormRepository.save(player);

    return player;
  }
}

export default PlayersRepository;
