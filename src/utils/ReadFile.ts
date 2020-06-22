import fs from 'fs';

import AppError from '../errors/AppError';

interface ICommand {
  lineCommand: string;
  lineValue: string;
}

export default class ReadFile {
  public readLogFile(logFile: string): string[] {
    if (fs.existsSync(logFile)) {
      return fs.readFileSync(logFile).toString('utf8').split('\n');
    }
    throw new AppError('File not found', 404);
  }

  public parseLines(lines: string[], regExp: RegExp): ICommand[] {
    const linesCommands: ICommand[] = [];

    lines.forEach(line => {
      const lineMatch = line.match(regExp);
      const command: ICommand = {
        lineCommand: lineMatch ? lineMatch[1] : '',
        lineValue: line,
      };
      if (regExp.test(line)) {
        linesCommands.push(command);
      }
    });

    return linesCommands;
  }
}
