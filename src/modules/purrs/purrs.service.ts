import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurrsEntity } from '@purrch/core/postgres/entities';
import { CreatePurrsDto, PurrsDto } from '@purrch/common/dtos/purrs';
import { plainToInstance } from 'class-transformer';
import { logAndThrowError } from '@purrch/common/utils';
import { PageDto, PageMetaDto, PageOptionsDto } from '@purrch/common/dtos';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import {
  HASHTAG_LINK_TO_PURR,
  PURRCH_TOPIC_EXCHANGE,
} from '@purrch/common/constants/purrch-events-constants';
import { LinkHashtagToPurrEvent } from '@purrch/common/types/rpc';

@Injectable()
export class PurrsService {
  private readonly logger: Logger = new Logger(PurrsService.name);

  constructor(
    @InjectRepository(PurrsEntity)
    private readonly purrRepository: Repository<PurrsEntity>,
    readonly amqp: AmqpConnection,
  ) {
  }

  async createPurr(createPurrsDto: CreatePurrsDto, userId: string): Promise<PurrsDto> {
    try {
      const purr: PurrsEntity = this.purrRepository.create({
        ...createPurrsDto,
        userId,
      });
      const response: PurrsEntity = await this.purrRepository.save(purr);

      const hashtags: string[] = await this.extractHashtags(createPurrsDto.content);

      await this.amqp.request<LinkHashtagToPurrEvent['input']>(
        {
          exchange: PURRCH_TOPIC_EXCHANGE,
          routingKey: HASHTAG_LINK_TO_PURR,
          payload: {
            linkHashtagToPurrData: {
              purrId: response.id,
              hashtags,
            },
          },
        },
      );

      return plainToInstance(PurrsDto, response);
    } catch (err) {
      logAndThrowError(this.logger, this.createPurr.name, err, BadRequestException);
    }
  }

  async getPurrs(pageOptionsDto: PageOptionsDto): Promise<PageDto<PurrsDto>> {
    const [purrs, itemCount] = await this.purrRepository.findAndCount({
      relations: ['user', 'images','purrHashtags'],
      skip: PageOptionsDto.getSkip(pageOptionsDto),
      take: pageOptionsDto.take,
      order: { createdAt: pageOptionsDto.order },
    });

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    const result: PurrsDto[] = purrs.map((value: PurrsEntity): PurrsDto =>
      plainToInstance(PurrsDto, value),
    );

    return new PageDto(result, pageMetaDto);
  }

  async extractHashtags(content: string): Promise<string[]> {
    const hashtags: RegExpMatchArray | null = content.match(/#\w+/g);
    return hashtags ? hashtags.map(tag => tag.replace('#', '').toLowerCase()) : [];
  }

}
