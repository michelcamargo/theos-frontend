import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app/app.config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import LoggingInterceptor from './common/interceptors/logging.interceptor';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import RootExceptionsFilter from './common/filters/root-exceptions.filter';
import { WinstonMiddleware } from './common/middlewares/winston.middleware';
import { AppController } from './app.controller';
import { GithubModule } from './models/github/github.module';
import { AuthModule } from './models/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: '.env',
    }),
    WinstonModule.forRoot({
      transports: [
        // new winston.transports.Console({ handleExceptions: true }),
        new winston.transports.File({ filename: './logs/application.log' }),
      ],
    }),
    GithubModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: RootExceptionsFilter,
    },
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(WinstonMiddleware).forRoutes('*');
  }
}
