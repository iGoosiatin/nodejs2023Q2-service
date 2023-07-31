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
  buildNotFoundDescrition,
} from '../../../utils/apiUtils';

export default function ApiGetById(entity: string) {
  return applyDecorators(
    ApiParam({ name: 'id', type: String, format: 'uuid' }),
    ApiOkResponse({ description: successOperationDescription }),
    ApiBadRequestResponse({
      description: buildInvalidUuidDescription(),
    }),
    ApiNotFoundResponse({ description: buildNotFoundDescrition(entity) }),
  );
}
