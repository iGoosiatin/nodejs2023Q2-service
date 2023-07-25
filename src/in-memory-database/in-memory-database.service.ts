import { Injectable } from '@nestjs/common';
import { User } from '../interfaces/user.interface';

@Injectable()
export class InMemoryDatabaseService {
  private users: User[] = [
    {
      id: '1',
      login: '1',
      password: '1',
      createdAt: 1,
      updatedAt: 1,
      version: 2,
    },
  ];

  sayHi() {
    console.log('Hi!');
  }

  get user() {
    return {
      findUnique: this.findUser,
      findMany: this.findUsers,
    };
  }

  private findUser = async (id: string): Promise<User | undefined> => {
    const user = this.users.find((user) => user.id === id);
    return user;
  };

  private findUsers = async () => this.users;
}
