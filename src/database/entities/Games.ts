import {
  ObjectID,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity('games')
class Game {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  game: BigInteger;

  @Column()
  total_kills: BigInteger;

  @Column()
  players: JSON;

  @Column()
  kills: JSON;

  @Column()
  log: JSON;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Game;
