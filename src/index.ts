import app from './app';
import dotenv from 'dotenv';
import Logger from './services/logger';

// load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  Logger.info(`Server running on http://localhost:${PORT}`);
  Logger.info('Logger service initialized successfully');
});
