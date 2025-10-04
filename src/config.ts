import { Dialect } from 'sequelize';
import env from './utils/validate-env';

interface dbConfig {
  [key: string]: {
    host: string;
    port: number;
    username: string;
    password: string;
    dialect: Dialect;
    logging: boolean;
    database: string;
  };
}

export const db: dbConfig = {
  development: {
    logging: false,
    dialect: 'mysql',
    port: env.MYSQL_PORT,
    host: env.MYSQL_HOST,
    username: env.MYSQL_USER,
    password: env.MYSQL_PASSWORD,
    database: `${env.DB_NAME}_dev`,
  },
  staging: {
    logging: false,
    dialect: 'mysql',
    port: env.MYSQL_PORT,
    host: env.MYSQL_HOST,
    username: env.MYSQL_USER,
    password: env.MYSQL_PASSWORD,
    database: `${env.DB_NAME}_stg`,
  },
  production: {
    logging: false,
    dialect: 'mysql',
    host: env.MYSQL_HOST,
    port: env.MYSQL_PORT,
    database: env.DB_NAME,
    username: env.MYSQL_USER,
    password: env.MYSQL_PASSWORD,
  },
};

// mapper for environment variables
export const port = env.PORT;
export const environment = env.NODE_ENV;
