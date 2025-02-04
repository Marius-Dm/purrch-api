import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PurrsEntity } from '@purrch/core/postgres/entities/purrs.entity';

@Entity('purrs_image')
export class PurrsImageEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'purr_id', type: 'uuid' })
  purrId!: string;

  @ManyToOne(() => PurrsEntity, (purr) => purr.images)
  @JoinColumn({ name: 'purr_id' })
  purr!: PurrsEntity;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 255 })
  url!: string;

  @Column({ name: 'thumbnail_name', type: 'varchar', length: 255 })
  thumbnailName!: string;

  @Column({ name: 'thumbnail_url', type: 'varchar', length: 255 })
  thumbnailUrl!: string;
}