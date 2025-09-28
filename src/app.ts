import express from 'express';
import logger from './services/logger';

const app = express();

// middleware to parse JSON
app.use(express.json());

// log all requests
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url} - ${req.ip}`);
  next();
});

app.get('/', (req, res) => {
  logger.info('Home route accessed');
  res.send('Hello TypeScript + Node.js!');
});

app.get('/health', (req, res) => {
  logger.info('Health check endpoint accessed');
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/error', (req, res) => {
  logger.error('This is a test error log');
  res.status(500).json({ error: 'Test error endpoint' });
});

export default app;
