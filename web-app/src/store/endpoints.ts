export const LIVE_SERVER_SOCKET = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3001'
  : 'ec2-3-250-18-16.eu-west-1.compute.amazonaws.com:3000';
