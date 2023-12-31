import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';
import {
  buildCreationDescription,
  missingPropertiesDescription,
} from '../../utils/api.utils';

export default function ApiCreate(entity: string) {
  return applyDecorators(
    ApiCreatedResponse({ description: buildCreationDescription(entity) }),
    ApiBadRequestResponse({
      description: missingPropertiesDescription,
    }),
  );
}
