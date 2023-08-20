import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiParam,
} from '@nestjs/swagger';
import {
  buildDeletionDescription,
  buildInvalidUuidDescription,
  buildNotFoundDescription,
} from '../../utils/api.utils';

export default function ApiDeleteFav(entity: string, alias?: string) {
  return applyDecorators(
    ApiParam({ name: 'id', type: String, format: 'uuid' }),
    ApiNoContentResponse({ description: buildDeletionDescription(entity) }),
    ApiNotFoundResponse({
      description: buildNotFoundDescription(alias || entity),
    }),
    ApiBadRequestResponse({
      description: buildInvalidUuidDescription(),
    }),
  );
}
