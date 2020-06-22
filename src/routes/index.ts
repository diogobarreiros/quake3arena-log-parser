import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';

import GameController from '../controllers/GameController';

const gameController = new GameController();
const routes = Router();

const upload = multer(uploadConfig.multer);

routes.patch('/logfile', upload.single('logfile'), gameController.create);

routes.get('/games', gameController.index);
routes.get('/games/:game', gameController.show);

export default routes;
