import { OmitType } from '@nestjs/swagger';
import { PurrsDto } from '@purrch/common/dtos/purrs/purrs.dto';

export class CreatePurrsDto extends OmitType(PurrsDto, ['id', 'userId', 'purrHashtags', 'createdAt', 'updatedAt', 'deletedAt'] as const) {
}