import path from 'path';
import DailyRotateFile from 'winston-daily-rotate-file';
import { createLogger, transports, format, addColors } from 'winston';

// create logs directory if it doesn't exist
const dir = path.join(process.cwd(), 'logs');

// define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// define colors for each level
const colors = {
  error: 'red',
  info: 'green',
  warn: 'yellow',
  debug: 'white',
  http: 'magenta',
};

// tell winston that you want to link the colors
addColors(colors);

const dailyRotateFile = new DailyRotateFile({
  maxSize: '20m',
  level: 'debug',
  maxFiles: '14d',
  zippedArchive: true,
  handleExceptions: true,
  datePattern: 'YYYY-MM-DD',
  filename: dir + '/%DATE%.log',
  format: format.combine(format.errors({ stack: true }), format.timestamp(), format.json()),
});

export default createLogger({
  levels,
  transports: [
    dailyRotateFile,
    new transports.Console({
      level: 'debug',
      format: format.combine(format.prettyPrint(), format.errors({ stack: true }), format.colorize({ all: true })),
    }),
  ],
  exceptionHandlers: [dailyRotateFile],
  exitOnError: false, // do not exit on handled exceptions
});
