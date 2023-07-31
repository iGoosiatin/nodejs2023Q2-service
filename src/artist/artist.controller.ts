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
import { ApiTags } from '@nestjs/swagger';
import {
  ApiCreate,
  ApiDeleteById,
  ApiGetAll,
  ApiGetById,
  ApiUpdateById,
} from 'src/common/decorators/api';

@ApiTags('Artist')
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @ApiGetAll()
  async findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  @ApiGetById('Artist')
  async findOne(@Param() { id }: UuidParams) {
    const artist = await this.artistService.findOne(id);
    if (!artist) {
      throw new ArtistNotFoundException();
    }

    return artist;
  }

  @Post()
  @HttpCode(201)
  @ApiCreate('Artist')
  async create(@Body() artistDto: ArtistDto) {
    const artist = await this.artistService.create(artistDto);
    return artist;
  }

  @Put(':id')
  @ApiUpdateById('Artist')
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
  @ApiDeleteById('Artist')
  async remove(@Param() { id }: UuidParams) {
    const success = await this.artistService.remove(id);

    if (!success) {
      throw new ArtistNotFoundException();
    }

    return;
  }
}
