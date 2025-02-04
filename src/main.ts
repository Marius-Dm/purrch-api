import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { logApplicationDetails } from '@purrch/common/utils';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('purrch/api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
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
  SwaggerModule.setup('purrch/api/docs', app, document);

  const port = configService.getOrThrow<number>('HTTP_PORT');
  await app.listen(port, '0.0.0.0').then(() => {
    logApplicationDetails(port);
  });
}
bootstrap();
