import { Injectable } from '@nestjs/common';
import { AlbumDto } from './dto/album.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class AlbumService {
  constructor(private dbService: DatabaseService) {}

  async findAll() {
    const albums = await this.dbService.album.findMany();
    return albums;
  }

  async findOne(id: string) {
    const album = await this.dbService.album.findUnique({ where: { id } });
    return album;
  }

  async create(data: AlbumDto) {
    const album = await this.dbService.album.create({ data });
    return album;
  }

  async update(id: string, data: AlbumDto) {
    try {
      const updatedAlbum = await this.dbService.album.update({
        where: { id },
        data,
      });
      return updatedAlbum;
    } catch {
      return null;
    }
  }

  async remove(id: string) {
    try {
      await this.dbService.album.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }
}
