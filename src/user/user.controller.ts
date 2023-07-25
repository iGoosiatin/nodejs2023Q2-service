import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';
import {
  UserNotFoundException,
  WrongPasswordException,
} from './errors/user.errors';
import { CreateUserDto } from './dto/create-user.dto';
import { UuidParams } from '../common/dto/uuid-param.dto';
import { UpdateUserPassword } from './dto/update-user-password.dto';

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

  @Put(':id')
  async updateUserPassword(
    @Param() { id }: UuidParams,
    @Body() { oldPassword, newPassword }: UpdateUserPassword,
  ): Promise<User> {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new UserNotFoundException();
    }

    const isPasswordCorrect = await this.userService.isPasswordCorrect(
      id,
      oldPassword,
    );

    if (!isPasswordCorrect) {
      throw new WrongPasswordException();
    }

    const updatedUser = await this.userService.changePassword(
      user,
      newPassword,
    );

    return updatedUser;
  }

  @Delete(':id')
  @HttpCode(204)
  async removeUser(@Param() { id }: UuidParams): Promise<void> {
    const success = await this.userService.remove(id);

    if (!success) {
      throw new UserNotFoundException();
    }

    return;
  }
}
