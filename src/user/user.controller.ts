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
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UserEntity } from './entities/user.entity';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  buildCreationDescription,
  buildDeletionDescription,
  buildInvalidUuidDescription,
  buildInvalidUuidOrBodyDescription,
  buildNotFoundDescrition,
  missingPropertiesDescription,
  successOperationDescription,
} from 'src/utils/apiUtils';

@ApiTags('User')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiOkResponse({ description: successOperationDescription })
  async findUsers(): Promise<UserEntity[]> {
    const users = await this.userService.findAll();
    return users.map((user) => new UserEntity(user));
  }

  @Get(':id')
  @ApiParam({ name: 'userId', type: String })
  @ApiOkResponse({ description: successOperationDescription })
  @ApiBadRequestResponse({
    description: buildInvalidUuidDescription('userId'),
  })
  @ApiNotFoundResponse({ description: buildNotFoundDescrition('User') })
  async findUser(@Param() { id }: UuidParams): Promise<UserEntity> {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new UserNotFoundException();
    }

    return new UserEntity(user);
  }

  @Post()
  @ApiCreatedResponse({ description: buildCreationDescription('User') })
  @ApiBadRequestResponse({
    description: missingPropertiesDescription,
  })
  @HttpCode(201)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.userService.create(createUserDto);

    return new UserEntity(user);
  }

  @Put(':id')
  @ApiParam({ name: 'userId', type: String })
  @ApiOkResponse({ description: successOperationDescription })
  @ApiBadRequestResponse({
    description: buildInvalidUuidOrBodyDescription('userId'),
  })
  @ApiNotFoundResponse({ description: buildNotFoundDescrition('User') })
  async updateUserPassword(
    @Param() { id }: UuidParams,
    @Body() { oldPassword, newPassword }: UpdateUserPasswordDto,
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
  @ApiParam({ name: 'userId', type: String })
  @ApiNoContentResponse({ description: buildDeletionDescription('User') })
  @ApiNotFoundResponse({ description: buildNotFoundDescrition('User') })
  @ApiBadRequestResponse({
    description: buildInvalidUuidDescription('userId'),
  })
  @HttpCode(204)
  async removeUser(@Param() { id }: UuidParams): Promise<void> {
    const success = await this.userService.remove(id);

    if (!success) {
      throw new UserNotFoundException();
    }

    return;
  }
}
