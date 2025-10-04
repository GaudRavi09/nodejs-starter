import cors from 'cors';
import { environment } from './config';
import Logger from './services/logger.service';
import express, { Express, ErrorRequestHandler } from 'express';
import { NotFoundError, ApiError, InternalError, ErrorType } from './services/error.service';

export class App {
  public express: Express = express();

  constructor() {
    process.on('uncaughtException', (e) => {
      Logger.error(e);
    });

    this.express.use(express.json({ limit: '10mb' }));
    this.express.use(express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));
    this.express.use(
      cors({
        origin: '*',
        methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'access-token'],
      }),
    );

    // catch 404 and forward to error handler
    this.express.use((req, res, next) => next(new NotFoundError()));

    // middleware error handler
    const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
      if (err instanceof ApiError) {
        ApiError.handle(err, res);
        if (err.type === ErrorType.INTERNAL) {
          Logger.error(`500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        }
      } else {
        Logger.error(`500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        Logger.error(err);
        if (environment === 'development') {
          res.status(500).send(err);
        }
        ApiError.handle(new InternalError(), res);
      }
    };

    this.express.use(errorHandler);
  }
}
