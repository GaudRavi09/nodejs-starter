import 'dotenv/config';
import { App } from './app';
import { createServer } from 'http';
import { Sequelize } from 'sequelize';
import env from './utils/validate-env';
import Logger from './services/logger.service';
import { initializeDatabase } from './database';

const app = new App();
let sequelize: Sequelize;
const PORT = env.PORT || 3000;
const http = createServer(app.express);

try {
  (async () => {
    // initialize database connection
    sequelize = await initializeDatabase();

    // now run alter operation safely
    await sequelize.sync({ alter: true });
    Logger.info('Database synchronized successfully');

    // start the server
    http.listen(PORT, async () => {
      Logger.info(`Server is running on port ${PORT}`);
    });
  })();
} catch (error) {
  Logger.error(error);
}
