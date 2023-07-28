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
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  buildDeletionDescription,
  buildNotFoundDescrition,
  buildInvalidUuidDescription,
  buildInvalidUuidOrBodyDescription,
  successOperationDescription,
  buildCreationDescription,
  missingPropertiesDescription,
} from 'src/utils/apiUtils';

@ApiTags('Track')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @ApiOkResponse({ description: successOperationDescription })
  async findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  @ApiOkResponse({ description: successOperationDescription })
  @ApiBadRequestResponse({
    description: buildInvalidUuidDescription(),
  })
  @ApiNotFoundResponse({ description: buildNotFoundDescrition('Track') })
  async findOne(@Param() { id }: UuidParams) {
    const track = await this.trackService.findOne(id);
    if (!track) {
      throw new TrackNotFoundException();
    }

    return track;
  }

  @Post()
  @HttpCode(201)
  @ApiBody({ type: TrackDto })
  @ApiCreatedResponse({ description: buildCreationDescription('Track') })
  @ApiBadRequestResponse({
    description: missingPropertiesDescription,
  })
  async create(@Body() trackDto: TrackDto) {
    const track = await this.trackService.create(trackDto);
    return track;
  }

  @Put(':id')
  @ApiBody({ type: TrackDto })
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  @ApiOkResponse({ description: successOperationDescription })
  @ApiBadRequestResponse({
    description: buildInvalidUuidOrBodyDescription(),
  })
  @ApiNotFoundResponse({ description: buildNotFoundDescrition('Track') })
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
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  @ApiNoContentResponse({ description: buildDeletionDescription('Track') })
  @ApiNotFoundResponse({ description: buildNotFoundDescrition('Track') })
  @ApiBadRequestResponse({
    description: buildInvalidUuidDescription(),
  })
  async remove(@Param() { id }: UuidParams) {
    const success = await this.trackService.remove(id);

    if (!success) {
      throw new TrackNotFoundException();
    }

    return;
  }
}
