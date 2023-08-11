import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class FavsService {
  constructor(private dbService: DatabaseService) {}

  async findAll() {
    const [artists, albums, tracks] = await Promise.all([
      this.dbService.favArtist.findMany({ select: { artist: true } }),
      this.dbService.favAlbum.findMany({ select: { album: true } }),
      this.dbService.favTrack.findMany({ select: { track: true } }),
    ]);
    return {
      artists: artists.map(({ artist }) => artist),
      albums: albums.map(({ album }) => album),
      tracks: tracks.map(({ track }) => track),
    };
  }

  async saveFavTrack(trackId: string) {
    const favTrack = await this.dbService.favTrack.create({
      data: { trackId },
      select: { track: true },
    });
    return favTrack.track;
  }

  async removeFavTrack(trackId: string) {
    try {
      await this.dbService.favTrack.delete({ where: { trackId } });
      return true;
    } catch {
      return false;
    }
  }

  async saveFavAlbum(albumId: string) {
    const favAlbum = await this.dbService.favAlbum.create({
      data: { albumId },
      select: { album: true },
    });
    return favAlbum.album;
  }

  async removeFavAlbum(albumId: string) {
    try {
      await this.dbService.favAlbum.delete({ where: { albumId } });
      return true;
    } catch {
      return false;
    }
  }

  async saveFavArtist(artistId: string) {
    const favArtist = await this.dbService.favArtist.create({
      data: { artistId },
      select: { artist: true },
    });
    return favArtist.artist;
  }

  async removeFavArtist(artistId: string) {
    try {
      await this.dbService.favArtist.delete({ where: { artistId } });
      return true;
    } catch {
      return false;
    }
  }
}
