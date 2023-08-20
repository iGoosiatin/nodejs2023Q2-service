import { ConsoleLogger, LogLevel } from '@nestjs/common';
import { writeFile, watch, stat, rename } from 'fs/promises';

export class CustomLogger extends ConsoleLogger {
  private static LOG_FILE = 'logs/log.txt';
  private static ERROR_LOG_FILE = 'logs/error.log.txt';

  verbose(message: string, context?: string) {
    super.verbose(message, context || this.context);
    const formattedMessage = this.formatCustomMessage(
      'verbose',
      message,
      context || this.context,
    );
    this.writeToFile(formattedMessage);
  }

  debug(message: string, context?: string) {
    super.debug(message, context || this.context);
    const formattedMessage = this.formatCustomMessage(
      'debug',
      message,
      context || this.context,
    );
    this.writeToFile(formattedMessage);
  }

  log(message: string, context?: string) {
    super.log(message, context || this.context);
    const formattedMessage = this.formatCustomMessage(
      'log',
      message,
      context || this.context,
    );
    this.writeToFile(formattedMessage);
  }

  warn(message: string, context?: string) {
    super.warn(message, context || this.context);
    const formattedMessage = this.formatCustomMessage(
      'warn',
      message,
      context || this.context,
    );
    this.writeToFile(formattedMessage);
  }

  error(message: string, stack?: string, context?: string) {
    const formattedMessage = this.formatCustomMessage(
      'error',
      message,
      context || this.context,
    );
    if (stack) {
      super.error(message, stack, context || this.context);
      this.writeToFile(formattedMessage, true);
      const formattedStack = this.formatCustomMessage(
        'error',
        stack,
        context || this.context,
      );
      this.writeToFile(formattedStack, true);
      return;
    }
    super.error(message, context || this.context);
    this.writeToFile(formattedMessage, true);
  }

  async logRotate(limit: number) {
    this.log(
      `Log rotate enabled with limit size of ${limit}`,
      CustomLogger.name,
    );

    const logWatcher = watch(CustomLogger.LOG_FILE);
    for await (const event of logWatcher) {
      if (event.eventType === 'change') {
        const { size } = await stat(CustomLogger.LOG_FILE);
        if (size > limit) {
          rename(
            CustomLogger.LOG_FILE,
            `${CustomLogger.LOG_FILE}.${new Date().getTime()}`,
          );
        }
      }
    }

    const errorLogWatcher = watch(CustomLogger.ERROR_LOG_FILE);
    for await (const event of errorLogWatcher) {
      if (event.eventType === 'change') {
        const { size } = await stat(CustomLogger.ERROR_LOG_FILE);
        if (size > limit) {
          rename(
            CustomLogger.ERROR_LOG_FILE,
            `${CustomLogger.ERROR_LOG_FILE}.${new Date().getTime()}`,
          );
        }
      }
    }
  }

  private writeToFile(formattedMessage: string, extraErrorLogging?: boolean) {
    writeFile(CustomLogger.LOG_FILE, formattedMessage, { flag: 'a' });
    extraErrorLogging &&
      writeFile(CustomLogger.ERROR_LOG_FILE, formattedMessage, {
        flag: 'a',
      });
  }

  private formatCustomMessage(
    logLevel: LogLevel,
    message: string,
    context?: string,
  ) {
    return `${this.getTimestamp()}\t${logLevel.toUpperCase()}\t[${
      context || ''
    }] ${message}\n`;
  }
}
