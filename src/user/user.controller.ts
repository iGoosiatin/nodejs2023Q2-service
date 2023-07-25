import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';
import { UserNotFoundException } from './errors/user.errors';
import { CreateUserDto } from './dto/create-user.dto';
import { UuidParams } from '../common/dto/uuid-param.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findUsers(): Promise<User[]> {
    const users = await this.userService.findAll();
    return users;
  }

  @Get(':id')
  async findUser(@Param() { id }: UuidParams): Promise<User> {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  @Post()
  @HttpCode(201)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userService.create(createUserDto);

    return user;
  }
}
