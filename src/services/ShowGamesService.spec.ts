import 'reflect-metadata';

import Game from 'database/entities/Game';
import AppError from '../errors/AppError';

import FakeGamesRepository from '../database/repositories/fakes/FakeGamesRepository';
import ShowGamesService from './ShowGamesService';

let showGames: ShowGamesService;
let fakeGamesRepository: FakeGamesRepository;

describe('ShowGames', () => {
  beforeEach(() => {
    fakeGamesRepository = new FakeGamesRepository();

    showGames = new ShowGamesService(fakeGamesRepository);
  });

  it('should be able to bring game', async () => {
    const game2 = await fakeGamesRepository.create({
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
    const insertedGame: Game = game2;
    const game: Game | undefined = await showGames.execute('2');

    expect(game).toEqual(insertedGame);
  });

  it('should not be able to bring game', async () => {
    await expect(showGames.execute('55')).rejects.toBeInstanceOf(AppError);
  });
});
