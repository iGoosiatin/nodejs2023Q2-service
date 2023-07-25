import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';
import { UserNotFoundException } from './errors/user.errors';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll(): User[] {
    const users = this.userService.findAll();
    return users;
  }

  @Get(':id')
  findOne(@Param('id') id: string): User {
    const user = this.userService.findOne(id);

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }
}
