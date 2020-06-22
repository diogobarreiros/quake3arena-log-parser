import { InsertWriteOpResult } from 'typeorm';
import ICreateGameDTO from '../../../dtos/ICreateGameDTO';
import Game from '../../entities/Game';

export default interface IGamesRepository {
  create(data: ICreateGameDTO): Promise<Game>;
  clear(): Promise<void>;
  insertMany(array: ICreateGameDTO[]): Promise<InsertWriteOpResult>;
  findAllGames(): Promise<Game[]>;
  findGame(game: number): Promise<Game | undefined>;
}
