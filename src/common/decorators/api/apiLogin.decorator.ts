import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import {
  buildForbiddenDescription,
  missingPropertiesDescription,
  successOperationDescription,
} from '../../utils/api.utils';

export default function ApiLogin(input: string) {
  return applyDecorators(
    ApiOkResponse({ description: successOperationDescription }),
    ApiBadRequestResponse({
      description: missingPropertiesDescription,
    }),
    ApiForbiddenResponse({
      description: buildForbiddenDescription(input),
    }),
  );
}
