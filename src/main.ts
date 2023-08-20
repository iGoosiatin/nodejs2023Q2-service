import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CustomLogger } from './custom-logger/custom-logger.service';
import { logLevels } from './common/constants/log-levels.constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);

  const logger = app.get(CustomLogger);
  app.useLogger(logger);
  app.useLogger(logLevels[configService.get('LOG_LEVEL', 2)]);
  logger.logRotate(parseInt(configService.get('MAX_LOG_SIZE', '100000')));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const port = configService.get('PORT', 4000);

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service')
    .setVersion('1.0')
    .addServer(`http://localhost:${port}`)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  app.enableCors();

  await app.listen(port);

  process.on('unhandledRejection', (error) => {
    if (error instanceof Error) {
      logger.error(error.message, error.stack, 'UnhandledRejection');
    } else if (typeof error === 'object') {
      logger.error(JSON.stringify(error), undefined, 'UnhandledRejection');
    } else {
      logger.error(String(error), undefined, 'UnhandledRejection');
    }
  });

  process.on('uncaughtException', (error) => {
    logger.error(error.message, error.stack, 'UncaughtException');
    app.close();
  });
}

bootstrap();

// setTimeout(() => {
//   throw new Error('Test error');
// }, 3000);

// setTimeout(() => {
//   Promise.reject('Test rejected promise');
// }, 2000);
