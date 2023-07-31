import { Injectable } from '@nestjs/common';
import { InMemoryDatabaseService } from '../in-memory-database/in-memory-database.service';

@Injectable()
export class FavsService {
  constructor(private dbService: InMemoryDatabaseService) {}

  async findAll() {
    const [artists, albums, tracks] = await Promise.all([
      this.dbService.favArtist.findMany(),
      this.dbService.favAlbum.findMany(),
      this.dbService.favTrack.findMany(),
    ]);
    return { artists, albums, tracks };
  }

  async saveFavTrack(id: string) {
    const favTrack = await this.dbService.favTrack.create(id);
    return favTrack;
  }

  async removeFavTrack(id: string) {
    const favTrack = await this.dbService.favTrack.delete(id);
    return !!favTrack;
  }

  async saveFavAlbum(id: string) {
    const favAlbum = await this.dbService.favAlbum.create(id);
    return favAlbum;
  }

  async removeFavAlbum(id: string) {
    const favAlbum = await this.dbService.favAlbum.delete(id);
    return !!favAlbum;
  }

  async saveFavArtist(id: string) {
    const favArtist = await this.dbService.favArtist.create(id);
    return favArtist;
  }

  async removeFavArtist(id: string) {
    const favArtist = await this.dbService.favArtist.delete(id);
    return !!favArtist;
  }
}
