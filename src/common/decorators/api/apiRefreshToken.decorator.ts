import { applyDecorators } from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  buildForbiddenDescription,
  missingPropertiesDescription,
  successOperationDescription,
} from '../../utils/api.utils';

export default function ApiRefreshToken(input: string) {
  return applyDecorators(
    ApiOkResponse({ description: successOperationDescription }),
    ApiUnauthorizedResponse({
      description: missingPropertiesDescription,
    }),
    ApiForbiddenResponse({
      description: buildForbiddenDescription(input),
    }),
  );
}
