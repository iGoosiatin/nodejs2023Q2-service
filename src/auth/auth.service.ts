import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../common/interfaces/user.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userService.findValidLogin(username, password);
    return user;
  }

  async login(user: User) {
    const payload = { username: user.login, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
