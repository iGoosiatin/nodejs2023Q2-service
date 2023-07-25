import { Injectable } from '@nestjs/common';
import { NewUser, User } from '../interfaces/user.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class InMemoryDatabaseService {
  private users: User[] = [];

  get user() {
    return {
      findUnique: this.findUser,
      findMany: this.findUsers,
      create: this.createUser,
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
}
