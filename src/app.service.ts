import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  checkHealth(): any {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
    };
  }
}
