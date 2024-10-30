import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { UsersEntity } from './users.entity';

@Entity('followers')
export class FollowersEntity {
  @PrimaryColumn({ name: 'follower_id', type: 'uuid' })
  followerId!: string;

  @CreateDateColumn({ name: 'followed_at', type: 'timestamp' })
  followedAt!: Date;

  @ManyToOne(() => UsersEntity, (user) => user.followers)
  @JoinColumn({ name: 'follower_id' })
  follower!: UsersEntity;

  @PrimaryColumn({ name: 'followed_id', type: 'uuid' })
  followedId!: string;

  @ManyToOne(() => UsersEntity, (user) => user.followed)
  @JoinColumn({ name: 'followed_id' })
  followed!: UsersEntity;
}
