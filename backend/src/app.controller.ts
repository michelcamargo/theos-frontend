import { Controller, Get, UseInterceptors } from '@nestjs/common';
import ExceptionInterceptor from './common/interceptors/exception.interceptor';

@Controller()
@UseInterceptors(ExceptionInterceptor)
export class AppController {
  constructor() {}

  @Get('healthcheck')
  async healthCheck() {
    try {
      return {
        message: 'Ready',
      };
    } catch (err) {
      return {
        message: 'Error',
      };
    }
  }
}
