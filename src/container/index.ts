import { container } from 'tsyringe';

import IGamesRepository from '../database/repositories/interfaces/IGamesRepository';
import GamesRepository from '../database/repositories/GamesRepository';

container.registerSingleton<IGamesRepository>(
  'GamesRepository',
  GamesRepository,
);
