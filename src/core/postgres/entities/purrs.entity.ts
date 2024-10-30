import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UsersEntity } from './users.entity';
import { PurrHashtagsEntity } from './purr-hashtags.entity';
import { PurrsLikesEntity } from './purrs-likes.entity';
import { NotificationsEntity } from './notifications.entity';

@Entity('purrs')
export class PurrsEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  deletedAt?: Date;

  @Column({ name: 'user_id', type: 'uuid' })
  userId!: string;

  @ManyToOne(() => UsersEntity, (user) => user.purrs)
  @JoinColumn({ name: 'user_id' })
  user!: UsersEntity;

  @Column({ name: 'orignal_purr_id', type: 'uuid', nullable: true })
  originalPurrId?: string;

  @OneToMany(() => PurrsEntity, (purr) => purr.originalPurr)
  originalPurr?: PurrsEntity;

  @ManyToOne(() => PurrsEntity, (purr) => purr.originalPurr)
  @JoinColumn({ name: 'original_purr_id' })
  purrs?: PurrsEntity[];

  @Column({ type: 'text', nullable: true })
  content?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  media_url?: string;

  @OneToMany(() => PurrHashtagsEntity, (purrHashtag) => purrHashtag.purr)
  purrHashtags!: PurrHashtagsEntity[];

  @OneToMany(() => PurrsLikesEntity, (purrLike) => purrLike.purr)
  likedUsers!: PurrsLikesEntity[];

  @OneToMany(() => NotificationsEntity, (notification) => notification.purr)
  notifications!: NotificationsEntity[];
}
