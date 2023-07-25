import { IsNotEmpty, IsString } from 'class-validator';
import { NewUser } from 'src/common/interfaces/user.interface';

export class CreateUserDto implements NewUser {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
