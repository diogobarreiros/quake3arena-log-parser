import { Router } from 'express';

import GameController from '../controllers/GameController';

const gameController = new GameController();
const routes = Router();

routes.get('/', gameController.create);

export default routes;
