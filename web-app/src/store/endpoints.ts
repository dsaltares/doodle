export const LIVE_SERVER_SOCKET =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : 'https://api.doodle.saltares.com';
