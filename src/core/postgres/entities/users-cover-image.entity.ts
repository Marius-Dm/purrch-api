import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsersEntity } from '@purrch/core/postgres/entities/users.entity';

@Entity('users_cover_image')
export class UsersCoverImageEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId!: string;

  @ManyToOne(() => UsersEntity, (user) => user.coverImage)
  @JoinColumn({ name: 'user_id' })
  user!: UsersEntity;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 255 })
  url!: string;

  @Column({ name: 'avatar_name', type: 'varchar', length: 255 })
  avatarName!: string;

  @Column({ name: 'thumbnail_url', type: 'varchar', length: 255 })
  avatarUrl!: string;
}