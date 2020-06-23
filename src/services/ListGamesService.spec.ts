import 'reflect-metadata';

import Game from 'database/entities/Game';
import AppError from '../errors/AppError';

import FakeGamesRepository from '../database/repositories/fakes/FakeGamesRepository';
import ListGamesService from './ListGamesService';

let listGames: ListGamesService;
let fakeGamesRepository: FakeGamesRepository;

describe('ListGames', () => {
  beforeEach(() => {
    fakeGamesRepository = new FakeGamesRepository();

    listGames = new ListGamesService(fakeGamesRepository);
  });

  it('should be able to list the games', async () => {
    const game1 = await fakeGamesRepository.create({
      game: 1,
      total_kills: 0,
      players: JSON.parse(JSON.stringify(['Isgalamido'])),
      kills: JSON.parse(
        JSON.stringify([
          {
            playerName: 'Isgalamido',
            kills: 0,
          },
        ]),
      ),
      logs: JSON.parse(JSON.stringify([])),
    });

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

    const game3 = await fakeGamesRepository.create({
      game: 3,
      total_kills: 4,
      players: JSON.parse(
        JSON.stringify(['Dono da Bola', 'Isgalamido', 'Zeh']),
      ),
      kills: JSON.parse(
        JSON.stringify([
          {
            playerName: 'Dono da Bola',
            kills: 1,
          },
          {
            playerName: 'Isgalamido',
            kills: 0,
          },
          {
            playerName: 'Zeh',
            kills: 0,
          },
        ]),
      ),
      logs: JSON.parse(
        JSON.stringify([
          'Dono da Bola matou o player Isgalamido com MOD_ROCKET',
          '<world> matou o player Zeh com MOD_TRIGGER_HURT',
          '<world> matou o player Zeh com MOD_TRIGGER_HURT',
          '<world> matou o player Isgalamido com MOD_FALLING',
        ]),
      ),
    });
    const insertedGames: Game[] = [game1, game2, game3];
    const games: Game[] = await listGames.execute();

    expect(games).toEqual(insertedGames);
  });

  it('should not be able to list the games', async () => {
    await fakeGamesRepository.clear();

    await expect(listGames.execute()).rejects.toBeInstanceOf(AppError);
  });
});
