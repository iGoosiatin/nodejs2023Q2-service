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
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  app.enableCors();

  await app.listen(port);

  process.on('unhandledRejection', (error) => {
    logger.error(error, 'UnhandledRejection');
  });

  process.on('uncaughtException', (error) => {
    logger.error(error, 'UncaughtException');
    process.exit(1);
  });
}

bootstrap();
