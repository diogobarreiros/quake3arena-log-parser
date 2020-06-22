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
  game: number;

  @Column()
  total_kills: number;

  @Column()
  players: JSON;

  @Column()
  kills: JSON;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Game;
