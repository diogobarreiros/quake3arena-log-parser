import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

import { ObjectID } from 'mongodb';

@Entity('games')
class Game {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  game: number;

  @Column()
  total_kills: number;

  @Column()
  players: JSON;

  @Column()
  kills: JSON;

  @Column()
  logs: JSON;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Game;
