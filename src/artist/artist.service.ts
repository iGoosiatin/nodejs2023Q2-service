import { Injectable } from '@nestjs/common';
import { ArtistDto } from './dto/artist.dto';
import { InMemoryDatabaseService } from 'src/in-memory-database/in-memory-database.service';
import { Artist } from 'src/common/interfaces/artist.interface';

@Injectable()
export class ArtistService {
  constructor(private dbService: InMemoryDatabaseService) {}

  async findAll() {
    const artists = await this.dbService.artist.findMany();
    return artists;
  }

  async findOne(id: string) {
    const artist = await this.dbService.artist.findUnique(id);
    return artist;
  }

  async create(artistDto: ArtistDto) {
    const artist = await this.dbService.artist.create(artistDto);
    return artist;
  }

  async update(artist: Artist, artistDto: ArtistDto) {
    const updatedArtist = await this.dbService.artist.update({
      ...artist,
      ...artistDto,
    });
    return updatedArtist;
  }

  async remove(id: string) {
    const artist = await this.dbService.artist.delete(id);
    return !!artist;
  }
}
