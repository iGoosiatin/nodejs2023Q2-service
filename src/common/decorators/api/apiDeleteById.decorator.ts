import { applyDecorators } from '@nestjs/common';
import {
  ApiParam,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import {
  buildDeletionDescription,
  buildInvalidUuidDescription,
  buildNotFoundDescription,
} from '../../utils/api.utils';

export default function ApiDeleteById(entity: string) {
  return applyDecorators(
    ApiParam({ name: 'id', type: String, format: 'uuid' }),
    ApiNoContentResponse({ description: buildDeletionDescription(entity) }),
    ApiNotFoundResponse({ description: buildNotFoundDescription(entity) }),
    ApiBadRequestResponse({
      description: buildInvalidUuidDescription(),
    }),
  );
}
