import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UsersEntity } from './users.entity';
import { NotificationsEntity } from './notifications.entity';
import { AttachmentsEntity } from '@purrch/core/postgres/entities/attachments.entity';

@Entity('messages')
export class MessagesEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @CreateDateColumn({ name: 'sent_at', type: 'timestamp' })
  sentAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  deletedAt?: Date;

  @Column({ name: 'sender_id', type: 'uuid' })
  senderId!: string;

  @ManyToOne(() => UsersEntity, (user) => user.sentMessages)
  sender!: UsersEntity;

  @Column({ name: 'receiver_id', type: 'uuid' })
  receiverId!: string;

  @ManyToOne(() => UsersEntity, (user) => user.receivedMessages)
  receiver!: UsersEntity;

  @Column({ name: 'is_read', type: 'boolean', default: false })
  isRead!: boolean;

  @OneToMany(() => NotificationsEntity, (notification) => notification.message)
  notifications!: NotificationsEntity[];

  @OneToMany(() => AttachmentsEntity, (attachment) => attachment.message)
  attachments!: AttachmentsEntity[];
}
