import {
  ObjectID,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity('players')
class Player {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  game: number;

  @Column()
  playerCode: number;

  @Column()
  playerName: string;

  @Column()
  kills: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Player;
