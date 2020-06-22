import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateGameService from '../services/CreateGameService';

export default class GameController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createGame = container.resolve(CreateGameService);

    await createGame.execute(request.file.filename);
    return response.status(204).json();
  }
}
