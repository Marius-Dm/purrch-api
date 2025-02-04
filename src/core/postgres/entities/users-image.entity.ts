import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsersEntity } from '@purrch/core/postgres/entities/users.entity';

@Entity('users_image')
export class UsersImageEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId!: string;

  @ManyToOne(() => UsersEntity, (user) => user.userImages)
  @JoinColumn({ name: 'user_id' })
  user!: UsersEntity;

  @Column({ type: 'varchar', length: 200 })
  name!: string;

  @Column({name: 'avatar_name', type: 'varchar', length: 200 })
  avatarName!: string;

  @Column({ type: 'varchar', length: 300 })
  url!: string;

  @Column({ name: 'avatar_url', type: 'varchar', length: 300 })
  avatarUrl!: string;

  @Column({ name: 'is_main', type: 'boolean', default: false })
  isMain!: boolean;
}