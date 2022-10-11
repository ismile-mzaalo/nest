if (process.env.NODE_ENV === 'production') {
  require('module-alias/register');
}
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { prototype } from 'events';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Users API Example')
    .setDescription('A Demo API with CURD operation ')
    .setVersion('1.0')
    .addTag('Nest-Api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = new ConfigService();
  const port = configService.get<number>('PORT');
  await app.listen(port);
}
bootstrap();
