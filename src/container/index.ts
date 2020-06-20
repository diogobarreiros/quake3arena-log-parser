import { container } from 'tsyringe';

import IPlayersRepository from '../database/repositories/interfaces/IPlayersRepository';
import PlayersRepository from '../database/repositories/PlayersRepository';

container.registerSingleton<IPlayersRepository>(
  'PlayersRepository',
  PlayersRepository,
);
