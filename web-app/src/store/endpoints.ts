export const LIVE_SERVER_SOCKET = process.env.NODE_ENV === 'development'
  ? 'api.doodle.saltares.com:3000'
  : 'http://localhost:3001';
