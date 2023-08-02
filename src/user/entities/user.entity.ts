import { Exclude } from 'class-transformer';
import { User } from '../../common/interfaces/user.interface';

type TUserEntity = Omit<User, 'createdAt' | 'updatedAt'> & {
  createdAt: number;
  updatedAt: number;
};

export class UserEntity implements TUserEntity {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  @Exclude()
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, {
      ...partial,
      createdAt: partial.createdAt?.getTime(),
      updatedAt: partial.updatedAt?.getTime(),
    });
  }
}
