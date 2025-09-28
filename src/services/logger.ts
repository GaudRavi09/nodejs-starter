import path from 'path';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

// create logs directory if it doesn't exist
const logsDir = path.join(process.cwd(), 'logs');

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
winston.addColors(colors);

// define which transports the logger must use
const transports = [
  // console transport
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize({ all: true }),
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
      winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
    ),
  }),

  // daily rotate file transport for all logs in single file
  new DailyRotateFile({
    maxSize: '20m',
    maxFiles: '14d',
    zippedArchive: true,
    datePattern: 'YYYY-MM-DD',
    filename: path.join(logsDir, '%DATE%.log'),
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  }),
];

// create the logger
const logger = winston.createLogger({
  levels,
  transports,
  exitOnError: false,
  level: process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'warn' : 'debug'),
});

// create a stream object with a 'write' function that will be used by morgan
export const morganStream = {
  write: (message: string) => {
    logger.http(message.substring(0, message.lastIndexOf('\n')));
  },
};

export default logger;
