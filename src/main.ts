import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './exception-handler.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Handle validation globally
  app.useGlobalPipes(new ValidationPipe());

  //swagger
  const config = new DocumentBuilder()
    .setTitle('Users API Example')
    .setDescription('A Demo API with CURD operation ')
    .setVersion('1.0')
    .addTag('Nest-Api')
    .addBearerAuth(
      {
        description: `Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        type: 'http',
        in: 'Header',
      },
      'Authorization',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //Exception handler
  //app.useGlobalFilters(new GlobalExceptionFilter());

  const configService = new ConfigService();
  const port = configService.get<number>('PORT');
  await app.listen(port);
}
bootstrap();
