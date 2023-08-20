import { applyDecorators } from '@nestjs/common';
import {
  ApiParam,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import {
  successOperationDescription,
  buildNotFoundDescription,
  buildInvalidUuidOrBodyDescription,
} from '../../utils/api.utils';

export default function ApiUpdateById(entity: string) {
  return applyDecorators(
    ApiParam({ name: 'id', type: String, format: 'uuid' }),
    ApiOkResponse({ description: successOperationDescription }),
    ApiBadRequestResponse({
      description: buildInvalidUuidOrBodyDescription(),
    }),
    ApiNotFoundResponse({ description: buildNotFoundDescription(entity) }),
  );
}
