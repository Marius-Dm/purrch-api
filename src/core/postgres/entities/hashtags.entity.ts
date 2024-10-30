import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PurrHashtagsEntity } from './purr-hashtags.entity';

@Entity('hashtags')
export class HashtagsEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  tag!: string;

  @OneToMany(() => PurrHashtagsEntity, (purrHashtag) => purrHashtag.hashtag)
  purrHashtags!: PurrHashtagsEntity[];
}
