import { Injectable } from '@nestjs/common';
import { ArtistDto } from './dto/artist.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ArtistService {
  constructor(private dbService: DatabaseService) {}

  async findAll() {
    const artists = await this.dbService.artist.findMany();
    return artists;
  }

  async findOne(id: string) {
    const artist = await this.dbService.artist.findUnique({ where: { id } });
    return artist;
  }

  async create(data: ArtistDto) {
    const artist = await this.dbService.artist.create({ data });
    return artist;
  }

  async update(id: string, data: ArtistDto) {
    try {
      const updatedArtist = await this.dbService.artist.update({
        where: { id },
        data,
      });
      return updatedArtist;
    } catch {
      return null;
    }
  }

  async remove(id: string) {
    try {
      await this.dbService.artist.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }
}
