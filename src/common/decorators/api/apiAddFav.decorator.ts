import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiParam,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import {
  buildAddToFavDescription,
  buildInvalidUuidDescription,
  buildUnprocessableFavDescription,
} from '../../utils/api.utils';

export default function ApiAddFav(entity: string) {
  return applyDecorators(
    ApiBearerAuth(),
    ApiParam({ name: 'id', type: String, format: 'uuid' }),
    ApiCreatedResponse({ description: buildAddToFavDescription(entity) }),
    ApiBadRequestResponse({
      description: buildInvalidUuidDescription(),
    }),
    ApiUnprocessableEntityResponse({
      description: buildUnprocessableFavDescription(entity.toLowerCase()),
    }),
  );
}
