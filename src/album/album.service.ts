import { Injectable } from '@nestjs/common';
import { AlbumDto } from './dto/album.dto';
import { InMemoryDatabaseService } from 'src/in-memory-database/in-memory-database.service';
import { Album } from 'src/common/interfaces/album.interface';

@Injectable()
export class AlbumService {
  constructor(private dbService: InMemoryDatabaseService) {}

  async findAll() {
    const albums = await this.dbService.album.findMany();
    return albums;
  }

  async findOne(id: string) {
    const album = await this.dbService.album.findUnique(id);
    return album;
  }

  async create(albumDto: AlbumDto) {
    const album = await this.dbService.album.create(albumDto);
    return album;
  }

  async update(album: Album, albumDto: AlbumDto) {
    const updatedalbum = await this.dbService.album.update({
      ...album,
      ...albumDto,
    });
    return updatedalbum;
  }

  async remove(id: string) {
    const album = await this.dbService.album.delete(id);
    return !!album;
  }
}
