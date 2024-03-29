import { getMongoRepository, MongoRepository } from 'typeorm';

import ICreateGameDTO from '../../dtos/ICreateGameDTO';
import IGamesRepository from './interfaces/IGamesRepository';

import Game from '../entities/Game';

class GamesRepository implements IGamesRepository {
  private ormRepository: MongoRepository<Game>;

  constructor() {
    this.ormRepository = getMongoRepository(Game);
  }

  public async findGame(game: number): Promise<Game | undefined> {
    const oneGame = await this.ormRepository.findOne({
      where: { game },
    });

    return oneGame;
  }

  public async findAllGames(): Promise<Game[]> {
    const games = await this.ormRepository.find();
    return games;
  }

  public async insertMany(array: ICreateGameDTO[]): Promise<number> {
    const games = await this.ormRepository.insertMany(array);
    return games.result.ok;
  }

  public async clear(): Promise<void> {
    await this.ormRepository.clear();
  }

  public async create({
    game,
    total_kills,
    players,
    kills,
    logs,
  }: ICreateGameDTO): Promise<Game> {
    const player = this.ormRepository.create({
      game,
      total_kills,
      players,
      kills,
      logs,
    });

    await this.ormRepository.save(player);

    return player;
  }
}

export default GamesRepository;
