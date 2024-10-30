import { NotificationTypeEnum } from '@purrch/common/enums';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UsersEntity } from './users.entity';
import { PurrsEntity } from './purrs.entity';
import { MessagesEntity } from './messages.entity';

@Entity('notifications')
export class NotificationsEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  deletedAt?: Date;

  @Column({ name: 'user_id', type: 'uuid' })
  userId!: string;

  @ManyToOne(() => UsersEntity, (user) => user.notifications)
  @JoinColumn({ name: 'user_id' })
  user!: UsersEntity;

  @Column({ name: 'related_user_id', type: 'uuid' })
  relatedUserId!: string;

  @ManyToOne(() => UsersEntity, (user) => user.relatedNotifications)
  @JoinColumn({ name: 'related_user_id' })
  relatedUser!: UsersEntity;

  @Column({ name: 'purr_id', type: 'uuid', nullable: true })
  purrId?: string;

  @ManyToOne(() => PurrsEntity, (purr) => purr.notifications)
  @JoinColumn({ name: 'purr_id' })
  purr?: PurrsEntity;

  @Column({ name: 'message_id', type: 'uuid', nullable: true })
  messageId?: string;

  @ManyToOne(() => MessagesEntity, (message) => message.notifications)
  @JoinColumn({ name: 'message_id' })
  message?: MessagesEntity;

  @Column({
    type: 'enum',
    enum: NotificationTypeEnum,
    nullable: false,
  })
  type: NotificationTypeEnum;

  @Column({ name: 'is_read', type: 'boolean', default: false })
  isRead!: boolean;
}
