import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  HttpCode,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { Public } from '../common/decorators/auth/isPublic';
import { CreateUserDto } from '../common/dto/create-user.dto';
import { UserEntity } from '../common/entities/user.entity';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Public()
  @Post('signup')
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(201)
  async signup(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.userService.create(createUserDto);

    return new UserEntity(user);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
