import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { User as FullUser } from '../interfaces/user.interface';
import { InMemoryDatabaseService } from 'src/in-memory-database/in-memory-database.service';

@Injectable()
export class UserService {
  private users: User[] = [];
  constructor(private dbService: InMemoryDatabaseService) {}

  async findAll() {
    return (await this.dbService.user.findMany()).map(this.removeUserPassword);
  }

  async findOne(id: string): Promise<User> {
    const user = await this.dbService.user.findUnique(id);
    return this.removeUserPassword(user);
  }

  private removeUserPassword(fullUser: FullUser | undefined): User {
    if (!fullUser) {
      return;
    }

    const user = { ...fullUser };
    delete user.password;

    return user;
  }
}
