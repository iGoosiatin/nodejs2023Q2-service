import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import {
  buildCreationDescription,
  missingPropertiesDescription,
} from '../../utils/api.utils';

export default function ApiCreate(entity: string, isPublic?: boolean) {
  return applyDecorators(
    ...(isPublic ? [] : [ApiBearerAuth()]),
    ApiCreatedResponse({ description: buildCreationDescription(entity) }),
    ApiBadRequestResponse({
      description: missingPropertiesDescription,
    }),
  );
}
