import { container } from 'tsyringe';

import CreateGameService from '../services/CreateGameService';
import ReadFile from '../utils/ReadFile';

export default class GameController {
  public async create(): Promise<void> {
    const createGame = container.resolve(CreateGameService);

    const readFile = new ReadFile();
    const lines = await readFile.readLogFile('src/logFile/games.log');
    const linesCommands = readFile.parseLines(
      lines,
      new RegExp('^.{0,7}([a-z A-Z][^:]*)'),
    );
    console.log(linesCommands);

    await createGame.execute();
    console.log('Server started on port 3333!');
  }
}
