import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Nack, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import {
HASHTAG_LINK_TO_PURR,
  PURRCH_QUEUE_PREFIX,
  PURRCH_TOPIC_EXCHANGE,
} from '@purrch/common/constants/purrch-events-constants';
import { HashtagService } from './hashtag.service';
import { LinkHashtagToPurrEvent } from '@purrch/common/types/rpc';
import { logAndThrowError } from '@purrch/common/utils';
import { HashtagsEntity } from '@purrch/core/postgres/entities';
import { HashtagDto } from '@purrch/common/dtos';

@Injectable()
export class HashtagConsumerService {
  private readonly logger = new Logger(HashtagConsumerService.name);

  constructor(
    private readonly hashtagService: HashtagService,
  ) {
  }

  @RabbitRPC({
    createQueueIfNotExists: true,
    exchange: PURRCH_TOPIC_EXCHANGE,
    routingKey: HASHTAG_LINK_TO_PURR,
    queue: `${PURRCH_QUEUE_PREFIX}${HASHTAG_LINK_TO_PURR}`,
    queueOptions: { autoDelete: false, durable: true },
  })
  // @ts-ignore
  private async linkHashtagToPurr({ linkHashtagToPurrData }: LinkHashtagToPurrEvent['input']): LinkHashtagToPurrEvent['output'] {
    try {
      const { purrId, hashtags } = linkHashtagToPurrData

      for(const hashtag of hashtags) {
        const foundTag: HashtagsEntity = await this.hashtagService.hashtagsRepository.findOneBy({ tag: hashtag });

      if(foundTag) {
        await this.hashtagService.linkHashtagToPurr(foundTag.id, purrId);
        continue;
      }

      const newTag: HashtagDto = await this.hashtagService.createHashtag({ tag: hashtag });
      await this.hashtagService.linkHashtagToPurr(newTag.id, purrId);
      }
    } catch (err) {
      logAndThrowError(this.logger, this.linkHashtagToPurr.name, err, BadRequestException);
      return new Nack();
    }
  }
}
