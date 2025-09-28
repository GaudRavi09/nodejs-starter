import cors from 'cors';
import Logger from './services/logger';
import { corsUrl, environment } from './config';
import express, { ErrorRequestHandler } from 'express';
import { NotFoundError, ApiError, InternalError, ErrorType } from './services/ApiError';

process.on('uncaughtException', (e) => {
  Logger.error(e);
});

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));
app.use(express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));

// catch 404 and forward to error handler
app.use((req, res, next) => next(new NotFoundError()));

// middleware error handler
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
    if (err.type === ErrorType.INTERNAL)
      Logger.error(`500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  } else {
    Logger.error(`500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    Logger.error(err);
    if (environment === 'development') {
      res.status(500).send(err);
    }
    ApiError.handle(new InternalError(), res);
  }
};

app.use(errorHandler);

export default app;
