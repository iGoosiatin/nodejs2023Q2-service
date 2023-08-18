import { ConsoleLogger, LogLevel } from '@nestjs/common';
import { writeFile } from 'fs/promises';

export class CustomLogger extends ConsoleLogger {
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

  private writeToFile(formattedMessage: string, extraErrorLogging?: boolean) {
    writeFile('logs/log.txt', formattedMessage, { flag: 'a' });
    extraErrorLogging &&
      writeFile('logs/error.log.txt', formattedMessage, {
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
