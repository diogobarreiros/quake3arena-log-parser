import ICreateGameDTO from '../../../dtos/ICreateGameDTO';
import Game from '../../entities/Game';

export default interface IGamesRepository {
  create(data: ICreateGameDTO): Promise<Game>;
  clear(): Promise<void>;
}
