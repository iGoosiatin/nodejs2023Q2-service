import { Injectable } from '@nestjs/common';
import { NewUser, User } from '../common/interfaces/user.interface';
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

  private createUser = async ({ login, password }: NewUser) => {
    const timestamp = +new Date();
    const user: User = {
      id: uuid(),
      login,
      password,
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
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

  private updateUser = async (id: string, newUserDetails: Partial<User>) => {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      return;
    }

    const timestamp = +new Date();
    const updatedUser: User = {
      ...user,
      ...newUserDetails,
      version: user.version + 1,
      updatedAt: timestamp,
    };

    this.users = this.users.map((user) =>
      user.id === id ? updatedUser : user,
    );
    return updatedUser;
  };
}
