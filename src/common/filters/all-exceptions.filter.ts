import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { CustomLogger } from '../../custom-logger/custom-logger.service';
import { ConfigService } from '@nestjs/config';
import { logLevels } from '../constants/log-levels.constant';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new CustomLogger(AllExceptionsFilter.name);

  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private configService: ConfigService,
  ) {
    this.logger.setLogLevels(logLevels[this.configService.get('LOG_LEVEL', 2)]);
  }

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const { url, method, body, query } = ctx.getRequest();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      ...(exception instanceof HttpException && { message: exception.message }),
      timestamp: new Date().toISOString(),
      path: url,
    };

    this.logger.debug(
      `${method} ${url} ${httpStatus} ${JSON.stringify(query)} ${JSON.stringify(
        body,
      )}`,
    );

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
