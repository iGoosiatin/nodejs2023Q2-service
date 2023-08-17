import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { CustomLogger } from '../../custom-logger/custom-logger.service';
import { ConfigService } from '@nestjs/config';
import { logLevels } from '../constants/log-levels.constant';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new CustomLogger(LoggingInterceptor.name);

  constructor(private configService: ConfigService) {
    this.logger.setLogLevels(logLevels[this.configService.get('LOG_LEVEL', 2)]);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpCtx = context.switchToHttp();
    const { url, body, query, method } = httpCtx.getRequest();
    const { statusCode } = httpCtx.getResponse();

    return next
      .handle()
      .pipe(
        tap(() =>
          this.logger.log(
            `${method} ${url} ${statusCode} ${JSON.stringify(
              query,
            )} ${JSON.stringify(body)}`,
          ),
        ),
      );
  }
}
