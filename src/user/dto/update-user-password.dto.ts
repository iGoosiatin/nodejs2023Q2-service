import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserPassword {
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
