import { NestFactory } from '@nestjs/core';

import { AppHttpExceptionFilter, DBExceptionFilter } from './common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AppHttpExceptionFilter());
  app.useGlobalFilters(new DBExceptionFilter());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
