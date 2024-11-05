import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();

    // Add response logging
    res.on('finish', () => {
      const duration = Date.now() - startTime;
      console.log(
        `[Response] ${new Date().toISOString()} ${req.method} ${req.path} ${res.statusCode} ${duration}ms`,
      );
    });

    next();
  }
}
