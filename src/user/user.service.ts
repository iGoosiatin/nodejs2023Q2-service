import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../common/dto/create-user.dto';
import { DatabaseService } from '../database/database.service';

import bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private dbService: DatabaseService,
    private configService: ConfigService,
  ) {}

  async findAll() {
    const users = await this.dbService.user.findMany();
    return users;
  }

  async findOne(id: string) {
    const user = await this.dbService.user.findUnique({ where: { id } });
    return user;
  }

  async findValidLogin(login: string, password: string) {
    const user = await this.dbService.user.findFirst({ where: { login } });
    if (!user) {
      return null;
    }
    const isValidLogin = await this.comparePasswords(user?.password, password);
    return isValidLogin ? user : null;
  }

  async create({ login, password }: CreateUserDto) {
    const data = { login, password: await this.hashPassword(password) };
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

  async changePassword(id: string, rawPassword: string) {
    const password = await this.hashPassword(rawPassword);
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

  async comparePasswords(hash: string, password: string) {
    return await bcrypt.compare(password, hash);
  }

  private async hashPassword(rawPassword: string) {
    const password = await bcrypt.hash(
      rawPassword,
      parseInt(this.configService.get('CRYPT_SALT', '10')),
    );
    return password;
  }
}
