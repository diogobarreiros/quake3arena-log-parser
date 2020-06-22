import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateGameService from '../services/CreateGameService';
import ListGamesService from '../services/ListGamesService';
import ShowGamesService from '../services/ShowGamesService';

import Game from '../database/entities/Game';

export default class GameController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createGame = container.resolve(CreateGameService);

    await createGame.execute(request.file.filename);
    return response.status(200).send({
      message: 'Successfully imported file.',
    });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listGames = container.resolve(ListGamesService);

    const games = await listGames.execute();

    return response.json(games);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { game } = request.params;
    const listGames = container.resolve(ShowGamesService);

    const oneGame: Game | undefined = await listGames.execute(game);

    let result;

    if (oneGame) {
      result = {
        [`game_${oneGame.game}`]: {
          total_kills: oneGame.total_kills,
          players: oneGame.players,
          kills: oneGame.kills,
          logs: oneGame.logs,
        },
      };
    }

    return response.status(200).send(result);
  }
}
