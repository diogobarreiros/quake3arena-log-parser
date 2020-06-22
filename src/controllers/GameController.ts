import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateGameService from '../services/CreateGameService';
import ListGamesService from '../services/ListGamesService';
import ShowGamesService from '../services/ShowGamesService';

export default class GameController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createGame = container.resolve(CreateGameService);

    await createGame.execute(request.file.filename);
    return response.status(204).json();
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listGames = container.resolve(ListGamesService);

    const games = await listGames.execute();

    return response.json(games);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { game } = request.params;
    const listGames = container.resolve(ShowGamesService);

    const games = await listGames.execute(game);

    return response.json(games);
  }
}
