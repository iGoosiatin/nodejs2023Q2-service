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
  buildNotFoundDescrition,
} from 'src/utils/apiUtils';

export default function ApiDeleteFav(entity: string, alias?: string) {
  return applyDecorators(
    ApiParam({ name: 'id', type: String, format: 'uuid' }),
    ApiNoContentResponse({ description: buildDeletionDescription(entity) }),
    ApiNotFoundResponse({
      description: buildNotFoundDescrition(alias || entity),
    }),
    ApiBadRequestResponse({
      description: buildInvalidUuidDescription(),
    }),
  );
}
