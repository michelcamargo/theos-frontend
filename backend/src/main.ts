import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import swaggerHelper from './common/helpers/swagger.helper';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const appConfig = app.get(ConfigService);
  const runtimeUrl = appConfig.get<number>('APP_URL');
  const runtimePort = appConfig.get<number>('PORT');
  const appName = appConfig.get<string>('APP_NAME');

  app.enableCors({
    origin: '*',
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type, Authorization',
  });

  if (!runtimeUrl || !runtimePort) throw Error('Sem variáveis de ambiente');

  swaggerHelper.generateAppDocument(app);
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());

  await app.listen(runtimePort);
  console.log(`${appName} @ ${runtimeUrl}`);
}

bootstrap();
