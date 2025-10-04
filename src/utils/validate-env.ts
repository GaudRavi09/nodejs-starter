import { cleanEnv, str, port } from 'envalid';

const env = cleanEnv(process.env, {
  // database configuration
  DB_NAME: str(),
  MYSQL_USER: str(),
  MYSQL_HOST: str(),
  MYSQL_PORT: port(),
  MYSQL_PASSWORD: str(),

  // API port
  PORT: port({ default: 3000 }),

  // server environment
  NODE_ENV: str({ choices: ['development', 'production', 'staging'] }),
});

export default env;
