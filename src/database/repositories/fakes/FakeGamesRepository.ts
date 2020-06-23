import { ObjectID } from 'mongodb';

import ICreateGameDTO from '../../../dtos/ICreateGameDTO';
import IGamesRepository from '../interfaces/IGamesRepository';

import Game from '../../entities/Game';

class FakeGamesRepository implements IGamesRepository {
  private games: Game[] = [];

  public async findGame(game: number): Promise<Game | undefined> {
    const oneGame = this.games.find(element => element.game === game);

    return oneGame;
  }

  public async findAllGames(): Promise<Game[]> {
    const { games } = this;
    return games;
  }

  public async insertMany(array: ICreateGameDTO[]): Promise<number> {
    array.forEach(element => {
      this.games.push({
        id: new ObjectID(),
        game: element.game,
        total_kills: element.total_kills,
        players: element.players,
        kills: element.kills,
        logs: element.logs,
        created_at: new Date(),
        updated_at: new Date(),
      });
    });
    return this.games.length > 1 ? 1 : 0;
  }

  public async clear(): Promise<void> {
    this.games = [];
  }

  public async create({
    game,
    total_kills,
    players,
    kills,
    logs,
  }: ICreateGameDTO): Promise<Game> {
    const player: Game = {
      id: new ObjectID(),
      game,
      total_kills,
      players,
      kills,
      logs,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.games.push(player);

    return player;
  }
}

export default FakeGamesRepository;
