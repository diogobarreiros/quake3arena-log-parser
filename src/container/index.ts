import { container } from 'tsyringe';

import IGamesRepository from '../database/repositories/interfaces/IGamesRepository';
import GamesRepository from '../database/repositories/GamesRepository';

import './logs';

container.registerSingleton<IGamesRepository>(
  'GamesRepository',
  GamesRepository,
);
