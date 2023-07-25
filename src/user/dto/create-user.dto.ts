import { NewUser } from 'src/interfaces/user.interface';

export class CreateUserDto implements NewUser {
  login: string;
  password: string;
}
