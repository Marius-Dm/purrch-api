import { Module } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashtagsEntity, PurrHashtagsEntity } from '@purrch/core/postgres/entities';
import { HashtagConsumerService } from './hashtag-consumer.service';

@Module({
  imports: [TypeOrmModule.forFeature([HashtagsEntity, PurrHashtagsEntity])],
  providers: [HashtagService, HashtagConsumerService]
})
export class HashtagModule {}
