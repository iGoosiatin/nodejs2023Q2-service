import { Controller, Get, HttpCode, Param, Post, Delete } from '@nestjs/common';
import { FavsService } from './favs.service';
import {
  FAV_ALBUM_ENDPOINT,
  FAV_ARTIST_ENDPOINT,
  FAV_TRACK_ENDPOINT,
} from './constants/favs.contants';
import { UuidParams } from 'src/common/dto/uuid-param.dto';
import { TrackService } from 'src/track/track.service';
import {
  UnprocessableFavException,
  FavNotFoundException,
} from './errors/favs.error';
import { Fav } from './interfaces/favs.interface';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';

@Controller('favs')
export class FavsController {
  constructor(
    private readonly favsService: FavsService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
  ) {}

  @Get()
  async findAll() {
    const favs = await this.favsService.findAll();
    return favs;
  }

  @Post(FAV_TRACK_ENDPOINT)
  @HttpCode(201)
  async saveFavTrack(@Param() { id }: UuidParams) {
    const track = await this.trackService.findOne(id);
    if (!track) {
      throw new UnprocessableFavException(Fav.TRACK);
    }

    const favTrack = await this.favsService.saveFavTrack(id);
    return favTrack;
  }

  @Delete(FAV_TRACK_ENDPOINT)
  @HttpCode(204)
  async removeFavTrack(@Param() { id }: UuidParams): Promise<void> {
    const success = await this.favsService.removeFavTrack(id);

    if (!success) {
      throw new FavNotFoundException(Fav.TRACK);
    }

    return;
  }

  @Post(FAV_ALBUM_ENDPOINT)
  @HttpCode(201)
  async saveFavAlbum(@Param() { id }: UuidParams) {
    const album = await this.albumService.findOne(id);
    if (!album) {
      throw new UnprocessableFavException(Fav.ALBUM);
    }

    const favAlbum = await this.favsService.saveFavAlbum(id);
    return favAlbum;
  }

  @Delete(FAV_ALBUM_ENDPOINT)
  @HttpCode(204)
  async removeFavAlbum(@Param() { id }: UuidParams): Promise<void> {
    const success = await this.favsService.removeFavAlbum(id);

    if (!success) {
      throw new FavNotFoundException(Fav.ALBUM);
    }

    return;
  }

  @Post(FAV_ARTIST_ENDPOINT)
  @HttpCode(201)
  async saveFavArtist(@Param() { id }: UuidParams) {
    const artist = await this.artistService.findOne(id);
    if (!artist) {
      throw new UnprocessableFavException(Fav.ARTIST);
    }

    const favArtist = await this.favsService.saveFavArtist(id);
    return favArtist;
  }

  @Delete(FAV_ARTIST_ENDPOINT)
  @HttpCode(204)
  async removeFavArtist(@Param() { id }: UuidParams): Promise<void> {
    const success = await this.favsService.removeFavArtist(id);

    if (!success) {
      throw new FavNotFoundException(Fav.ARTIST);
    }

    return;
  }
}
