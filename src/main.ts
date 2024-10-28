import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: '*',
  });

  const configSwagger = new DocumentBuilder()
    .setTitle('Purrch Platform Api')
    .setDescription('API Docs for Purrch Platform')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', name: 'AccessToken' })
    .build();

  const document = SwaggerModule.createDocument(app, configSwagger);

  await app.listen(3000);
}
bootstrap();
