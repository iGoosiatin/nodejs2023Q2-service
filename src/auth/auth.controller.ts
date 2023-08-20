import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  HttpCode,
  ClassSerializerInterceptor,
  UseInterceptors,
  ForbiddenException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../common/decorators/auth/isPublic';
import { UserDto } from '../common/dto/user.dto';
import { UserEntity } from '../common/entities/user.entity';
import { UserService } from '../user/user.service';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh.guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApiCreate, ApiLogin, ApiRefreshToken } from '../common/decorators/api';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Public()
  @ApiCreate('User')
  @Post('signup')
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(201)
  async signup(@Body() createUserDto: UserDto): Promise<UserEntity> {
    const user = await this.userService.create(createUserDto);

    return new UserEntity(user);
  }

  @Public()
  @ApiLogin('username/password')
  // @UseGuards(LocalAuthGuard) not using local strategy to have DTO validation
  @Post('login')
  async login(@Body() { login, password }: UserDto) {
    const user = await this.authService.validateUser(login, password);
    if (!user) {
      throw new ForbiddenException();
    }
    return this.authService.getTokenPair(user);
  }

  @Public() // Public means not accessToken jwt guard should be skipped - access token supposed to be expired
  @ApiRefreshToken('refresh token')
  @ApiBody({ type: RefreshTokenDto })
  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh')
  async refresh(@Request() req) {
    return this.authService.getTokenPair(req.user);
  }
}
