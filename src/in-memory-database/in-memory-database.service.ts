import { Injectable } from '@nestjs/common';
import {
  NewUser,
  UpdatedUser,
  User,
} from '../common/interfaces/user.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class InMemoryDatabaseService {
  private users: User[] = [];

  get user() {
    return {
      findUnique: this.findUser,
      findMany: this.findUsers,
      create: this.createUser,
      delete: this.deleteUser,
      update: this.updateUser,
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

  private deleteUser = async (id: string) => {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      return;
    }

    this.users = this.users.filter((user) => user.id !== id);
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
}
