import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app, { fallback: true });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
