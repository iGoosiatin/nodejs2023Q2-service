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
import { AlbumService } from './album.service';
import { AlbumDto } from './dto/album.dto';
import { UuidParams } from 'src/common/dto/uuid-param.dto';
import { AlbumNotFoundException } from './errors/album.errors';
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

@ApiTags('Album')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @ApiOkResponse({ description: successOperationDescription })
  async findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  @ApiOkResponse({ description: successOperationDescription })
  @ApiBadRequestResponse({
    description: buildInvalidUuidDescription(),
  })
  @ApiNotFoundResponse({ description: buildNotFoundDescrition('Album') })
  async findOne(@Param() { id }: UuidParams) {
    const album = await this.albumService.findOne(id);
    if (!album) {
      throw new AlbumNotFoundException();
    }

    return album;
  }

  @Post()
  @HttpCode(201)
  @ApiBody({ type: AlbumDto })
  @ApiCreatedResponse({ description: buildCreationDescription('Album') })
  @ApiBadRequestResponse({
    description: missingPropertiesDescription,
  })
  async create(@Body() albumDto: AlbumDto) {
    const album = await this.albumService.create(albumDto);
    return album;
  }

  @Put(':id')
  @ApiBody({ type: AlbumDto })
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  @ApiOkResponse({ description: successOperationDescription })
  @ApiBadRequestResponse({
    description: buildInvalidUuidOrBodyDescription(),
  })
  @ApiNotFoundResponse({ description: buildNotFoundDescrition('Album') })
  async update(@Param() { id }: UuidParams, @Body() albumDto: AlbumDto) {
    const album = await this.albumService.findOne(id);
    if (!album) {
      throw new AlbumNotFoundException();
    }

    const updatedAlbum = await this.albumService.update(album, albumDto);
    return updatedAlbum;
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  @ApiNoContentResponse({ description: buildDeletionDescription('Album') })
  @ApiNotFoundResponse({ description: buildNotFoundDescrition('Album') })
  @ApiBadRequestResponse({
    description: buildInvalidUuidDescription(),
  })
  async remove(@Param() { id }: UuidParams) {
    const success = await this.albumService.remove(id);

    if (!success) {
      throw new AlbumNotFoundException();
    }

    return;
  }
}
