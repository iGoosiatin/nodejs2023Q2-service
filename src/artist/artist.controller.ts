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
import { ArtistService } from './artist.service';
import { ArtistDto } from './dto/artist.dto';
import { UuidParams } from 'src/common/dto/uuid-param.dto';
import { ArtistNotFoundException } from './errors/artist.errors';
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
  successOperationDescription,
  buildInvalidUuidDescription,
  buildNotFoundDescrition,
  buildCreationDescription,
  missingPropertiesDescription,
  buildInvalidUuidOrBodyDescription,
  buildDeletionDescription,
} from 'src/utils/apiUtils';

@ApiTags('Artist')
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @ApiOkResponse({ description: successOperationDescription })
  async findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  @ApiOkResponse({ description: successOperationDescription })
  @ApiBadRequestResponse({
    description: buildInvalidUuidDescription(),
  })
  @ApiNotFoundResponse({ description: buildNotFoundDescrition('Artist') })
  async findOne(@Param() { id }: UuidParams) {
    const artist = await this.artistService.findOne(id);
    if (!artist) {
      throw new ArtistNotFoundException();
    }

    return artist;
  }

  @Post()
  @HttpCode(201)
  @ApiBody({ type: ArtistDto })
  @ApiCreatedResponse({ description: buildCreationDescription('Artist') })
  @ApiBadRequestResponse({
    description: missingPropertiesDescription,
  })
  async create(@Body() artistDto: ArtistDto) {
    const artist = await this.artistService.create(artistDto);
    return artist;
  }

  @Put(':id')
  @ApiBody({ type: ArtistDto })
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  @ApiOkResponse({ description: successOperationDescription })
  @ApiBadRequestResponse({
    description: buildInvalidUuidOrBodyDescription(),
  })
  @ApiNotFoundResponse({ description: buildNotFoundDescrition('Artist') })
  async update(@Param() { id }: UuidParams, @Body() artistDto: ArtistDto) {
    const artist = await this.artistService.findOne(id);
    if (!artist) {
      throw new ArtistNotFoundException();
    }

    const updatedArtist = await this.artistService.update(artist, artistDto);
    return updatedArtist;
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  @ApiNoContentResponse({ description: buildDeletionDescription('Artist') })
  @ApiNotFoundResponse({ description: buildNotFoundDescrition('Artist') })
  @ApiBadRequestResponse({
    description: buildInvalidUuidDescription(),
  })
  async remove(@Param() { id }: UuidParams) {
    const success = await this.artistService.remove(id);

    if (!success) {
      throw new ArtistNotFoundException();
    }

    return;
  }
}
