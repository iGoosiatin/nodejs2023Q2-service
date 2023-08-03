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
import { UuidParams } from '../common/dto/uuid-param.dto';
import { AlbumNotFoundException } from './errors/album.errors';
import { ApiTags } from '@nestjs/swagger';

import {
  ApiCreate,
  ApiDeleteById,
  ApiGetAll,
  ApiGetById,
  ApiUpdateById,
} from '../common/decorators/api';

@ApiTags('Album')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @ApiGetAll()
  async findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  @ApiGetById('Album')
  async findOne(@Param() { id }: UuidParams) {
    const album = await this.albumService.findOne(id);
    if (!album) {
      throw new AlbumNotFoundException();
    }

    return album;
  }

  @Post()
  @HttpCode(201)
  @ApiCreate('Album')
  async create(@Body() albumDto: AlbumDto) {
    const album = await this.albumService.create(albumDto);
    return album;
  }

  @Put(':id')
  @ApiUpdateById('Album')
  async update(@Param() { id }: UuidParams, @Body() albumDto: AlbumDto) {
    const updatedAlbum = await this.albumService.update(id, albumDto);

    if (!updatedAlbum) {
      throw new AlbumNotFoundException();
    }

    return updatedAlbum;
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiDeleteById('Album')
  async remove(@Param() { id }: UuidParams) {
    const success = await this.albumService.remove(id);

    if (!success) {
      throw new AlbumNotFoundException();
    }

    return;
  }
}
