import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { PurrsService } from './purrs.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@purrch/core/guards';
import { CreatePurrsDto, PurrsDto } from '@purrch/common/dtos/purrs';
import { LoggedUser } from '@purrch/common/decorators';
import { UsersEntity } from '@purrch/core/postgres/entities';
import { PageDto, PageOptionsDto } from '@purrch/common/dtos';

@ApiTags('Purrs')
@Controller('purrs')
export class PurrsController {
  constructor(
    private readonly purrsService: PurrsService,
  ) {
  }

  @ApiOperation({ summary: 'Create a post (purr)' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  async createPurr(
    @Body() createPurrsDto: CreatePurrsDto,
    @LoggedUser() user: UsersEntity): Promise<PurrsDto> {
    return this.purrsService.createPurr(createPurrsDto, user.id);
  }

  @ApiOperation({ summary: 'Get all purrs paginated' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  async getPurrs(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<PurrsDto>> {
    return this.purrsService.getPurrs(pageOptionsDto);
  }
}
