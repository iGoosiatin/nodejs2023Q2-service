import { ConsoleLogger, LogLevel } from '@nestjs/common';
import { writeFile } from 'fs/promises';

export class CustomLogger extends ConsoleLogger {
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
    super.log(message, context || this.context);
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
      super.error(message, stack, this.context);
      this.writeToFile(formattedMessage);
      this.writeToFile(stack);
      return;
    }
    super.error(message, context || this.context);
    this.writeToFile(formattedMessage);
  }

  private writeToFile(formattedMessage: string) {
    writeFile('logs/log.txt', formattedMessage, { flag: 'a' });
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
