import { HttpException, HttpStatus } from '@nestjs/common';
import { Fav } from '../interfaces/favs.interface';

export class FavNotFoundException extends HttpException {
  constructor(fav: Fav) {
    super(`Favorite ${fav} not found`, HttpStatus.NOT_FOUND);
  }
}

export class UnprocessableFavException extends HttpException {
  constructor(fav: Fav) {
    super(
      `Cannot add non-existing ${fav} to favorites`,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
