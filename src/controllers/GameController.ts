import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateGameService from '../services/CreateGameService';
import ReadFile from '../utils/ReadFile';

export default class GameController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createGame = container.resolve(CreateGameService);

    const readFile = new ReadFile();
    const lines = await readFile.readLogFile('src/logFile/games.log');
    const commandPattern: string | undefined = process.env.COMMAND_PATTERN;
    const linesCommands = readFile.parseLines(
      lines,
      new RegExp(commandPattern || ''),
    );

    await createGame.execute(linesCommands);
    return response.status(204).json();
  }
}
