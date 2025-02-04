import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { HashtagsEntity, PurrHashtagsEntity } from '@purrch/core/postgres/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHashtagDto, HashtagDto, PurrHashtagsDto } from '@purrch/common/dtos';
import { plainToInstance } from 'class-transformer';
import { logAndThrowError } from '@purrch/common/utils';

@Injectable()
export class HashtagService {
  private readonly logger: Logger = new Logger(HashtagService.name);

  constructor(
    @InjectRepository(HashtagsEntity)
    readonly hashtagsRepository: Repository<HashtagsEntity>,
    @InjectRepository(PurrHashtagsEntity)
    private readonly purrHashtagsRepository: Repository<PurrHashtagsEntity>,
  ) {
  }

  async createHashtag(createHashtagDto: CreateHashtagDto): Promise<HashtagDto> {
    const foundHashtag: HashtagsEntity = await this.hashtagsRepository.findOneBy({ tag: createHashtagDto.tag });
    if (!foundHashtag) {
      try {
        const newHashtag: HashtagsEntity = this.hashtagsRepository.create(createHashtagDto);
        const hashtag: HashtagsEntity = await this.hashtagsRepository.save(newHashtag);
        return plainToInstance(HashtagDto, hashtag);
      } catch (err) {
        logAndThrowError(this.logger, this.createHashtag.name, err, BadRequestException);
      }
    }
    return plainToInstance(HashtagDto, foundHashtag);
  }

  async linkHashtagToPurr(hashtagId: string, purrId: string): Promise<PurrHashtagsDto> {
    const foundHashTag: HashtagsEntity = await this.hashtagsRepository.findOneBy({ id: hashtagId });
    if (!foundHashTag) {
      logAndThrowError(this.logger, this.linkHashtagToPurr.name, `Hashtag with id ${hashtagId} not found`, BadRequestException);
    }
    try {
      const createLink: PurrHashtagsEntity = this.purrHashtagsRepository.create({
        hashtagId,
        purrId,
      });
      const result: PurrHashtagsEntity = await this.purrHashtagsRepository.save(createLink);
      return plainToInstance(PurrHashtagsDto, result);
    } catch (err) {
      logAndThrowError(this.logger, this.linkHashtagToPurr.name, err, BadRequestException);
    }
  }
}
