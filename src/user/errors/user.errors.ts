import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor() {
    super('User not found', HttpStatus.NOT_FOUND);
  }
}

export class WrongPasswordException extends HttpException {
  constructor() {
    super('Wrong password', HttpStatus.FORBIDDEN);
  }
}
