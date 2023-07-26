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

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  async findOne(@Param() { id }: UuidParams) {
    const album = await this.albumService.findOne(id);
    if (!album) {
      throw new AlbumNotFoundException();
    }

    return album;
  }

  @Post()
  @HttpCode(201)
  async create(@Body() albumDto: AlbumDto) {
    const album = await this.albumService.create(albumDto);
    return album;
  }

  @Put(':id')
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
  async remove(@Param() { id }: UuidParams) {
    const success = await this.albumService.remove(id);

    if (!success) {
      throw new AlbumNotFoundException();
    }

    return;
  }
}
