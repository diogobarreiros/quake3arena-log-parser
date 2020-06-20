import {
  ObjectID,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity('kills')
class Kill {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  game: number;

  @Column()
  playerKill: string;

  @Column()
  playerKilled: string;

  @Column()
  mod: string;

  @Column()
  log: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Kill;
