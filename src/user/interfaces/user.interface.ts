import { User as FullUser } from '../../interfaces/user.interface';

export type User = Omit<FullUser, 'password'>;
