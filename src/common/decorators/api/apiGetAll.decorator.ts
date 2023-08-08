import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { successOperationDescription } from '../../utils/api.utils';

export default function ApiGetAll() {
  return applyDecorators(
    ApiOkResponse({ description: successOperationDescription }),
  );
}
