import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { successOperationDescription } from '../../utils/api.utils';

export default function ApiGetAll() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOkResponse({ description: successOperationDescription }),
  );
}
