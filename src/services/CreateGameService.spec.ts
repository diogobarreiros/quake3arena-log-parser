import 'reflect-metadata';

import AppError from '../errors/AppError';

import FakeGamesRepository from '../database/repositories/fakes/FakeGamesRepository';
import FakeStorageLog from '../container/logs/StorageLog/fakes/FakeStorageLog';
import CreateGameService from './CreateGameService';

let createGame: CreateGameService;
let fakeGamesRepository: FakeGamesRepository;
let fakeStorageLog: FakeStorageLog;

describe('ShowGames', () => {
  beforeEach(() => {
    fakeGamesRepository = new FakeGamesRepository();

    createGame = new CreateGameService(fakeGamesRepository, fakeStorageLog);
  });

  it('should be able to import log file with database to clear', async () => {
    await fakeGamesRepository.create({
      game: 2,
      total_kills: 11,
      players: JSON.parse(JSON.stringify(['Isgalamido', 'Dono da Bola'])),
      kills: JSON.parse(
        JSON.stringify([
          {
            playerName: 'Isgalamido',
            kills: 2,
          },
          {
            playerName: 'Dono da Bola',
            kills: 1,
          },
        ]),
      ),
      logs: JSON.parse(
        JSON.stringify([
          '<world> matou o player Isgalamido com MOD_TRIGGER_HURT',
          '<world> matou o player Isgalamido com MOD_TRIGGER_HURT',
          '<world> matou o player Isgalamido com MOD_TRIGGER_HURT',
          'Isgalamido matou o player Dono da Bola com MOD_ROCKET_SPLASH',
          'Isgalamido matou o player Isgalamido com MOD_ROCKET_SPLASH',
          'Isgalamido matou o player Isgalamido com MOD_ROCKET_SPLASH',
          '<world> matou o player Isgalamido com MOD_TRIGGER_HURT',
          '<world> matou o player Isgalamido com MOD_TRIGGER_HURT',
          '<world> matou o player Isgalamido com MOD_TRIGGER_HURT',
          '<world> matou o player Isgalamido com MOD_FALLING',
          '<world> matou o player Isgalamido com MOD_TRIGGER_HURT',
        ]),
      ),
    });
    const saveFile = jest.spyOn(fakeStorageLog, 'saveFile');

    await createGame.execute('games.log');

    expect(saveFile).toHaveBeenCalledWith('games.log');
  });

  it('should not be able to import log file', async () => {
    await expect(createGame.execute('')).rejects.toBeInstanceOf(AppError);
  });
});
