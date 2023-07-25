import { User as FullUser } from '../../common/interfaces/user.interface';

export type User = Omit<FullUser, 'password'>;
