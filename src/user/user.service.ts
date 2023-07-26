import { Injectable } from '@nestjs/common';
import { InMemoryDatabaseService } from 'src/in-memory-database/in-memory-database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/common/interfaces/user.interface';

@Injectable()
export class UserService {
  private users: User[] = [];
  constructor(private dbService: InMemoryDatabaseService) {}

  async findAll() {
    const users = await this.dbService.user.findMany();
    return users;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.dbService.user.findUnique(id);
    return user;
  }

  async create(dto: CreateUserDto) {
    const timestamp = +new Date();
    const user = await this.dbService.user.create({
      ...dto,
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    });

    return user;
  }

  async remove(id: string): Promise<boolean> {
    const user = await this.dbService.user.delete(id);
    return !!user;
  }

  async changePassword(
    { id, login, version }: User,
    password: string,
  ): Promise<User> {
    const updatedUser = await this.dbService.user.update({
      id,
      login,
      password,
      version: version + 1,
      updatedAt: +new Date(),
    });
    return updatedUser;
  }
}
