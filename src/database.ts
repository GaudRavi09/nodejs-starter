import { Sequelize } from 'sequelize';
import { db, environment } from './config';
import Logger from './services/logger.service';

const dbConfig = db[environment];

function createSequelizeInstance(withDatabase = true): Sequelize {
  return new Sequelize(withDatabase ? dbConfig.database : '', dbConfig.username, dbConfig.password, {
    logging: false,
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
  });
}

export async function initializeDatabase(): Promise<Sequelize> {
  try {
    // create instance without database name to create database
    const sequelizeWithoutDB = createSequelizeInstance(false);

    // create database if it doesn't exist
    await sequelizeWithoutDB.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\`;`);
    await sequelizeWithoutDB.close();

    // create instance with database name
    const sequelize = createSequelizeInstance(true);

    // test connection
    await sequelize.authenticate();
    Logger.info('Database connection has been established successfully.');

    return sequelize;
  } catch (error) {
    Logger.error('Unable to connect to the database:', error);
    throw error;
  }
}
