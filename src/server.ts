import 'reflect-metadata';

import express from 'express';
import routes from './routes';
import GameController from './controllers/GameController';

const gameController = new GameController();
const app = express();

app.use(routes);

app.listen(3333, gameController.create);
