import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../common/interfaces/user.interface';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../common/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.userService.findFirstByLogin(username);
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }

  async signup(user: CreateUserDto) {
    const newUser = this.userService.create(user);
    return newUser;
  }

  async login(user: User) {
    const payload = { username: user.login, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
