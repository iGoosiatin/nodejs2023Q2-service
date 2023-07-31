import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { successOperationDescription } from '../../../utils/apiUtils';

export default function ApiGetAll() {
  return applyDecorators(
    ApiOkResponse({ description: successOperationDescription }),
  );
}
