import { Injectable } from '@nestjs/common';
import {
  NewUser,
  UpdatedUser,
  User,
} from '../common/interfaces/user.interface';
import { v4 as uuid } from 'uuid';
import { Artist, NewArtist } from 'src/common/interfaces/artist.interface';
import { Album, NewAlbum } from 'src/common/interfaces/album.interface';
import { Track, NewTrack } from 'src/common/interfaces/track.interface';

@Injectable()
export class InMemoryDatabaseService {
  private users: User[] = [];
  private artists: Artist[] = [];
  private albums: Album[] = [];
  private tracks: Track[] = [];
  private favArtists: string[] = [];
  private favAlbums: string[] = [];
  private favTracks: string[] = [];

  get user() {
    return {
      findUnique: this.findUser,
      findMany: this.findUsers,
      create: this.createUser,
      update: this.updateUser,
      delete: this.deleteUser,
    };
  }

  get artist() {
    return {
      findUnique: this.findArtist,
      findMany: this.findArtists,
      create: this.createArtist,
      update: this.updateArtist,
      delete: this.deleteArtist,
    };
  }

  get album() {
    return {
      findUnique: this.findAlbum,
      findMany: this.findAlbums,
      create: this.createAlbum,
      update: this.updateAlbum,
      delete: this.deleteAlbum,
    };
  }

  get track() {
    return {
      findUnique: this.findTrack,
      findMany: this.findTracks,
      create: this.createTrack,
      update: this.updateTrack,
      delete: this.deleteTrack,
    };
  }

  get favTrack() {
    return {
      findMany: this.findFavTracks,
      create: this.saveFavTrack,
      delete: this.deleteFavTrack,
    };
  }

  get favArtist() {
    return {
      findMany: this.findFavArtists,
      create: this.saveFavArtist,
      delete: this.deleteFavArtist,
    };
  }

  get favAlbum() {
    return {
      findMany: this.findFavAlbums,
      create: this.saveFavAlbum,
      delete: this.deleteFavAlbum,
    };
  }

  private findUser = async (id: string): Promise<User | undefined> => {
    const user = this.users.find((user) => user.id === id);
    return user;
  };

  private findUsers = async () => this.users;

  private createUser = async ({
    login,
    password,
    version,
    createdAt,
    updatedAt,
  }: NewUser) => {
    const user: User = {
      id: uuid(),
      login,
      password,
      version,
      createdAt,
      updatedAt,
    };

    this.users.push(user);
    return user;
  };

  private updateUser = async ({
    id,
    login,
    password,
    updatedAt,
    version,
  }: UpdatedUser) => {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      return;
    }

    const updatedUser: User = {
      ...user,
      login,
      password,
      version,
      updatedAt,
    };

    this.users = this.users.map((user) =>
      user.id === id ? updatedUser : user,
    );
    return updatedUser;
  };

  private deleteUser = async (id: string) => {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      return;
    }

    this.users = this.users.filter((user) => user.id !== id);
    return user;
  };

  private findArtist = async (id: string): Promise<Artist | undefined> => {
    const artist = this.artists.find((artist) => artist.id === id);
    return artist;
  };

  private findArtists = async () => this.artists;

  private createArtist = async ({ name, grammy }: NewArtist) => {
    const artist: Artist = {
      id: uuid(),
      name,
      grammy,
    };

    this.artists.push(artist);
    return artist;
  };

  private updateArtist = async ({ id, name, grammy }: Artist) => {
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) {
      return;
    }

    const updatedArtist: Artist = {
      ...artist,
      name,
      grammy,
    };

    this.artists = this.artists.map((artist) =>
      artist.id === id ? updatedArtist : artist,
    );
    return updatedArtist;
  };

  private deleteArtist = async (id: string) => {
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) {
      return;
    }

    this.artists = this.artists.filter((artist) => artist.id !== id);
    this.albums = this.albums.map((album) =>
      album.artistId === id ? { ...album, artistId: null } : album,
    );
    this.tracks = this.tracks.map((track) =>
      track.artistId === id ? { ...track, artistId: null } : track,
    );
    this.favArtists = this.favArtists.filter(
      (favArtistId) => favArtistId !== id,
    );
    return artist;
  };

  private findAlbum = async (id: string): Promise<Album | undefined> => {
    const album = this.albums.find((album) => album.id === id);
    return album;
  };

  private findAlbums = async () => this.albums;

  private createAlbum = async ({ name, year, artistId }: NewAlbum) => {
    const album: Album = {
      id: uuid(),
      name,
      year,
      artistId,
    };

    this.albums.push(album);
    return album;
  };

  private updateAlbum = async ({ id, name, year, artistId }: Album) => {
    const album = this.albums.find((album) => album.id === id);
    if (!album) {
      return;
    }

    const updatedAlbum: Album = {
      ...album,
      name,
      year,
      artistId,
    };

    this.albums = this.albums.map((album) =>
      album.id === id ? updatedAlbum : album,
    );
    return updatedAlbum;
  };

  private deleteAlbum = async (id: string) => {
    const album = this.albums.find((album) => album.id === id);
    if (!album) {
      return;
    }

    this.albums = this.albums.filter((album) => album.id !== id);
    this.tracks = this.tracks.map((track) =>
      track.albumId === id ? { ...track, albumId: null } : track,
    );
    this.favAlbums = this.favAlbums.filter((favAlbumId) => favAlbumId !== id);
    return album;
  };

  private findTrack = async (id: string): Promise<Track | undefined> => {
    const track = this.tracks.find((track) => track.id === id);
    return track;
  };

  private findTracks = async () => this.tracks;

  private createTrack = async ({
    name,
    artistId,
    albumId,
    duration,
  }: NewTrack) => {
    const track: Track = {
      id: uuid(),
      name,
      artistId,
      albumId,
      duration,
    };

    this.tracks.push(track);
    return track;
  };

  private updateTrack = async ({
    id,
    name,
    artistId,
    albumId,
    duration,
  }: Track) => {
    const track = this.tracks.find((track) => track.id === id);
    if (!track) {
      return;
    }

    const updatedTrack: Track = {
      ...track,
      name,
      artistId,
      albumId,
      duration,
    };

    this.tracks = this.tracks.map((track) =>
      track.id === id ? updatedTrack : track,
    );
    return updatedTrack;
  };

  private deleteTrack = async (id: string) => {
    const track = this.tracks.find((track) => track.id === id);
    if (!track) {
      return;
    }

    this.tracks = this.tracks.filter((track) => track.id !== id);
    this.deleteFavTrack(id);
    return track;
  };

  private findFavTracks = async () => this.favTracks.map(this._getTrack);

  private saveFavTrack = async (id: string) => {
    this.favTracks.push(id);
    return this._getTrack(id);
  };

  private deleteFavTrack = async (id: string) => {
    const track = this.favTracks.find((favTrackId) => favTrackId === id);
    if (!track) {
      return;
    }

    this.favTracks = this.favTracks.filter((favTrackId) => favTrackId !== id);
    return this._getTrack(id);
  };

  private findFavArtists = async () => this.favArtists.map(this._getArtist);

  private saveFavArtist = async (id: string) => {
    this.favArtists.push(id);
    return this._getArtist(id);
  };

  private deleteFavArtist = async (id: string) => {
    const artist = this.favArtists.find((favArtistId) => favArtistId === id);
    if (!artist) {
      return;
    }

    this.favArtists = this.favArtists.filter(
      (favArtistId) => favArtistId !== id,
    );
    return this._getArtist(id);
  };

  private findFavAlbums = async () => this.favAlbums.map(this._getAlbum);

  private saveFavAlbum = async (id: string) => {
    this.favAlbums.push(id);
    return this._getAlbum(id);
  };

  private deleteFavAlbum = async (id: string) => {
    const album = this.favAlbums.find((favAlbumId) => favAlbumId === id);
    if (!album) {
      return;
    }

    this.favAlbums = this.favAlbums.filter((favAlbumId) => favAlbumId !== id);
    return this._getAlbum(id);
  };

  private _getTrack = (id: string) =>
    this.tracks.find((track) => track.id === id) as Track;

  private _getArtist = (id: string) =>
    this.artists.find((artist) => artist.id === id) as Artist;

  private _getAlbum = (id: string) =>
    this.albums.find((album) => album.id === id) as Album;
}
