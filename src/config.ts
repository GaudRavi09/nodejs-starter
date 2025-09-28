// mapper for environment variables
export const port = process.env.PORT;
export const corsUrl = process.env.CORS_URL;
export const environment = process.env.NODE_ENV;

// export const db = {
//   name: process.env.DB_NAME || '',
//   host: process.env.DB_HOST || '',
//   port: process.env.DB_PORT || '',
//   user: process.env.DB_USER || '',
//   password: process.env.DB_USER_PWD || '',
//   minPoolSize: parseInt(process.env.DB_MIN_POOL_SIZE || '5'),
//   maxPoolSize: parseInt(process.env.DB_MAX_POOL_SIZE || '10'),
// };

// export const tokenInfo = {
//   issuer: process.env.TOKEN_ISSUER || '',
//   audience: process.env.TOKEN_AUDIENCE || '',
//   accessTokenValidity: parseInt(process.env.ACCESS_TOKEN_VALIDITY_SEC || '0'),
//   refreshTokenValidity: parseInt(process.env.REFRESH_TOKEN_VALIDITY_SEC || '0'),
// };

// export const redis = {
//   host: process.env.REDIS_HOST || '',
//   password: process.env.REDIS_PASSWORD || '',
//   port: parseInt(process.env.REDIS_PORT || '0'),
// };

// export const caching = {
//   contentCacheDuration: parseInt(process.env.CONTENT_CACHE_DURATION_MILLIS || '600000'),
// };
