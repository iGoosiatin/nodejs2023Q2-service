export interface User {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: Date; // timestamp of creation
  updatedAt: Date; // timestamp of last update
}

export type NewUser = Omit<User, 'id'>;

export type UpdatedUser = Omit<User, 'createdAt'>;
