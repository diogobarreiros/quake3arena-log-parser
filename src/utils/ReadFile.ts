import fs from 'fs';

interface ICommand {
  lineCommand: string;
  lineValue: string;
}

export default class ReadFile {
  public async readLogFile(logFile: string): Promise<string[]> {
    try {
      if (fs.existsSync(logFile)) {
        return fs.readFileSync(logFile).toString('utf8').split('\n');
      }
      throw new Error('File not found');
    } catch (err) {
      throw new Error(err);
    }
  }

  public async parseLines(lines: string[], regex: RegExp): Promise<ICommand[]> {
    try {
      const linesCommands: ICommand[] = [];

      lines.forEach(line => {
        const lineMatch = line.match(regex);
        const command: ICommand = {
          lineCommand: lineMatch != null ? lineMatch[1] : '',
          lineValue: line,
        };
        if (regex.test(line)) {
          linesCommands.push(command);
        }
      });

      return linesCommands;
    } catch (err) {
      throw new Error(err);
    }
  }
}
