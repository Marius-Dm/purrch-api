import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PurrsEntity } from './purrs.entity';
import { FollowersEntity } from './followers.entity';
import { MessagesEntity } from './messages.entity';
import { PurrsLikesEntity } from './purrs-likes.entity';
import { NotificationsEntity } from './notifications.entity';
import { UsersImageEntity } from '@purrch/core/postgres/entities/users-image.entity';
import { UsersCoverImageEntity } from '@purrch/core/postgres/entities/users-cover-image.entity';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  deletedAt?: Date;


  @Column({ type: 'varchar', length: 50, unique: true })
  username!: string;

  @Column({ name: 'display_name', type: 'varchar', length: 50 })
  displayName!: string;

  @Column({ name: 'birth_date', type: 'date' })
  birthDate!: Date;

  @Column({ type: 'varchar', length: 100, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 255 })
  password!: string;

  @Column({ type: 'text', nullable: true })
  bio?: string;

  @Column({ name: 'is_email_confirmed', type: 'boolean', default: false })
  isEmailConfirmed!: boolean;

  @OneToMany(() => PurrsEntity, (purr) => purr.user)
  purrs!: PurrsEntity[];

  @OneToMany(() => FollowersEntity, (follower) => follower.follower)
  followers!: FollowersEntity[];

  @OneToMany(() => FollowersEntity, (followed) => followed.followed)
  followed!: FollowersEntity[];

  @OneToMany(() => MessagesEntity, (message) => message.sender)
  sentMessages!: MessagesEntity[];

  @OneToMany(() => MessagesEntity, (message) => message.receiver)
  receivedMessages!: MessagesEntity[];

  @OneToMany(() => PurrsLikesEntity, (like) => like.user)
  likedPurrs!: PurrsLikesEntity[];

  @OneToMany(() => NotificationsEntity, (notification) => notification.user)
  notifications!: NotificationsEntity[];

  @OneToMany(
    () => NotificationsEntity,
    (notification) => notification.relatedUser,
  )
  relatedNotifications!: NotificationsEntity[];

  @OneToMany(() => UsersImageEntity, (image) => image.user)
  userImages!: UsersImageEntity[];

  @OneToMany(() => UsersCoverImageEntity, (coverImage) => coverImage.user)
  coverImage!: UsersCoverImageEntity;
}
