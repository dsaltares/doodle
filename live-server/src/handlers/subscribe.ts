import { HandlerParams } from './types';

import joinGame from './joinGame';
import disconnect from './disconnect';
import startGame from './startGame';
import chooseConcept from './chooseConcept';
import submitEntry from './submitEntry';
import chooseEntry from './chooseEntry';
import acknowledgeWinner from './acknowledgeWinner';

const subscribe = (params: HandlerParams) => {
  const { socket } = params;

  socket.on('joinGame', joinGame(params));
  socket.on('disconnect', disconnect(params));
  socket.on('startGame', startGame(params));
  socket.on('chooseConcept', chooseConcept(params));
  socket.on('submitEntry', submitEntry(params));
  socket.on('chooseEntry', chooseEntry(params));
  socket.on('acknowledgeWinner', acknowledgeWinner(params));
};

export default subscribe;