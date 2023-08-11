import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UserService {
  constructor(private dbService: DatabaseService) {}

  async findAll() {
    const users = await this.dbService.user.findMany();
    return users;
  }

  async findOne(id: string) {
    const user = await this.dbService.user.findUnique({ where: { id } });
    return user;
  }

  async create(data: CreateUserDto) {
    const user = await this.dbService.user.create({ data });

    return user;
  }

  async remove(id: string) {
    try {
      await this.dbService.user.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }

  async changePassword(id: string, password: string) {
    try {
      const updatedUser = await this.dbService.user.update({
        where: { id },
        data: {
          password,
          version: { increment: 1 },
        },
      });
      return updatedUser;
    } catch {
      return null;
    }
  }
}
