import { NestFactory } from '@nestjs/core';

import { AppHttpExceptionFilter } from './common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AppHttpExceptionFilter());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
