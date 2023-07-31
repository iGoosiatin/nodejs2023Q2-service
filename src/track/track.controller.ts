import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackDto } from './dto/track.dto';
import { UuidParams } from 'src/common/dto/uuid-param.dto';
import { TrackNotFoundException } from './errors/track.errors';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiCreate,
  ApiDeleteById,
  ApiGetAll,
  ApiGetById,
  ApiUpdateById,
} from 'src/common/decorators/api';

@ApiTags('Track')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @ApiGetAll()
  async findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  @ApiGetById('Track')
  async findOne(@Param() { id }: UuidParams) {
    const track = await this.trackService.findOne(id);
    if (!track) {
      throw new TrackNotFoundException();
    }

    return track;
  }

  @Post()
  @HttpCode(201)
  @ApiCreate('Track')
  async create(@Body() trackDto: TrackDto) {
    const track = await this.trackService.create(trackDto);
    return track;
  }

  @Put(':id')
  @ApiUpdateById('Track')
  async update(@Param() { id }: UuidParams, @Body() trackDto: TrackDto) {
    const track = await this.trackService.findOne(id);
    if (!track) {
      throw new TrackNotFoundException();
    }

    const updatedTrack = await this.trackService.update(track, trackDto);
    return updatedTrack;
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiDeleteById('Track')
  async remove(@Param() { id }: UuidParams) {
    const success = await this.trackService.remove(id);

    if (!success) {
      throw new TrackNotFoundException();
    }

    return;
  }
}
