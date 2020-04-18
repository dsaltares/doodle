export type SocketStatus = 'disconnected'
  | 'connecting'
  | 'connected'
  | 'error';

export type SocketState = {
  status: SocketStatus,
}
