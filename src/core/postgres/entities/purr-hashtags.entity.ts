import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { HashtagsEntity } from './hashtags.entity';
import { PurrsEntity } from './purrs.entity';

@Entity('purr_hashtags')
export class PurrHashtagsEntity {
  @PrimaryColumn({ name: 'purr_id', type: 'uuid' })
  purrId!: string;

  @PrimaryColumn({ name: 'hashtag_id', type: 'uuid' })
  hashtagId!: string;

  @ManyToOne(() => HashtagsEntity, (hashtag) => hashtag.purrHashtags)
  @JoinColumn({ name: 'hashtag_id' })
  hashtag!: HashtagsEntity;

  @ManyToOne(() => PurrsEntity, (purr) => purr.purrHashtags)
  @JoinColumn({ name: 'purr_id' })
  purr!: PurrsEntity;
}
