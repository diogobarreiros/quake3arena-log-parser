import ICreatePlayerDTO from '../../../dtos/ICreatePlayerDTO';
import Player from '../../entities/Player';

export default interface IPlayersRepository {
  create(data: ICreatePlayerDTO): Promise<Player>;
  clear(): Promise<void>;
}
