import { OmitType } from '@nestjs/swagger';
import { HashtagDto } from '@purrch/common/dtos/hashtag/hashtag.dto';

export class CreateHashtagDto extends OmitType(HashtagDto, ['id'] as const) {}