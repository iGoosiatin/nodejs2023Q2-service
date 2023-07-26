import { Injectable } from '@nestjs/common';
import {
  NewUser,
  UpdatedUser,
  User,
} from '../common/interfaces/user.interface';
import { v4 as uuid } from 'uuid';
import { Artist, NewArtist } from 'src/common/interfaces/artist.interface';

@Injectable()
export class InMemoryDatabaseService {
  private users: User[] = [];
  private artists: Artist[] = [];

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
    return artist;
  };
}
