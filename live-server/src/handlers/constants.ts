const isDevelopment = process.env.NODE_ENV === 'development';

export const MIN_PLAYERS = isDevelopment ? 2 : 4;
export const MAX_PLAYERS = 8;
export const CONCEPTS_PER_PLAYER = 4;
