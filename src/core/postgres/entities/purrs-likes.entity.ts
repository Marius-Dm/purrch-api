import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersEntity } from './users.entity';
import { PurrsEntity } from './purrs.entity';

@Entity('purrs_likes')
export class PurrsLikesEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId!: string;

  @ManyToOne(() => UsersEntity, (user) => user.likedPurrs)
  @JoinColumn({ name: 'user_id' })
  user!: UsersEntity;

  @Column({ name: 'purr_id', type: 'uuid' })
  purrId!: string;

  @ManyToOne(() => PurrsEntity, (purr) => purr.likedUsers)
  @JoinColumn({ name: 'purr_id' })
  purr!: PurrsEntity;

  @Column({
    name: 'liked_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  likedAt!: Date;
}
