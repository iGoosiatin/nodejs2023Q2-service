import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  UserNotFoundException,
  WrongPasswordException,
} from './errors/user.errors';
import { CreateUserDto } from './dto/create-user.dto';
import { UuidParams } from '../common/dto/uuid-param.dto';
import { UpdateUserPassword } from './dto/update-user-password.dto';
import { UserEntity } from './entities/user.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findUsers(): Promise<UserEntity[]> {
    const users = await this.userService.findAll();
    return users.map((user) => new UserEntity(user));
  }

  @Get(':id')
  async findUser(@Param() { id }: UuidParams): Promise<UserEntity> {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new UserNotFoundException();
    }

    return new UserEntity(user);
  }

  @Post()
  @HttpCode(201)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.userService.create(createUserDto);

    return new UserEntity(user);
  }

  @Put(':id')
  async updateUserPassword(
    @Param() { id }: UuidParams,
    @Body() { oldPassword, newPassword }: UpdateUserPassword,
  ): Promise<UserEntity> {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new UserNotFoundException();
    }

    if (oldPassword !== user.password) {
      throw new WrongPasswordException();
    }

    const updatedUser = await this.userService.changePassword(
      user,
      newPassword,
    );

    return new UserEntity(updatedUser);
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
