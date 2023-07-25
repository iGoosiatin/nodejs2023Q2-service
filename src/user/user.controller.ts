import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';
import { UserNotFoundException } from './errors/user.errors';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    const users = await this.userService.findAll();
    return users;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }
}
