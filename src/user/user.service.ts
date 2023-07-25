import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { User as FullUser } from '../common/interfaces/user.interface';
import { InMemoryDatabaseService } from 'src/in-memory-database/in-memory-database.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  private users: User[] = [];
  constructor(private dbService: InMemoryDatabaseService) {}

  async findAll() {
    const users = await this.dbService.user.findMany();
    return users.map(this.removeUserPassword);
  }

  async findOne(id: string): Promise<User> {
    const user = await this.dbService.user.findUnique(id);
    return this.removeUserPassword(user);
  }

  async create(dto: CreateUserDto) {
    const user = await this.dbService.user.create(dto);

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
