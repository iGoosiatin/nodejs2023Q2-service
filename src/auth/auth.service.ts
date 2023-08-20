import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../common/interfaces/user.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userService.findValidLogin(username, password);
    return user;
  }

  async getTokenPair(user: User) {
    const payload = { username: user.login, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_SECRET_REFRESH_KEY'),
        expiresIn: this.configService.get('TOKEN_REFRESH_EXPIRE_TIME'),
      }),
    };
  }
}
