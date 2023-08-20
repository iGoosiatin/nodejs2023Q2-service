import { applyDecorators } from '@nestjs/common';
import {
  ApiParam,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import {
  successOperationDescription,
  buildInvalidUuidDescription,
  buildNotFoundDescription,
} from '../../utils/api.utils';

export default function ApiGetById(entity: string) {
  return applyDecorators(
    ApiParam({ name: 'id', type: String, format: 'uuid' }),
    ApiOkResponse({ description: successOperationDescription }),
    ApiBadRequestResponse({
      description: buildInvalidUuidDescription(),
    }),
    ApiNotFoundResponse({ description: buildNotFoundDescription(entity) }),
  );
}
