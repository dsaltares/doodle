import { connect } from 'react-redux';

import InitialPhase, { StateProps, DispatchProps } from './InitialPhase';
import { AppDispatch } from '../../store';
import { RootState } from '../../store/reducers';
import { GameState } from '../../store/game/types';
import { startGame } from '../../store/game';
import { MIN_PLAYERS, MAX_PLAYERS } from '../../store/game/constants';

const mapStateToProps = (state: RootState): StateProps => {
  const game = state.game.gameState as GameState;
  const player = state.game.player as string;
  const numPlayers = Object.keys(game.players).length;
  const createdBy = game.players[game.createdBy];
  const location = window.location;

  return {
    creatorName: createdBy.name,
    createdGame: createdBy.id === player,
    missingPlayers: Math.max(0, MIN_PLAYERS - numPlayers),
    gameFull: numPlayers === MAX_PLAYERS,
    gameUrl: `${location.protocol}//${location.host}/#/game/${game.code}`,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  onStart: (): void => {
    dispatch(startGame());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(InitialPhase);
