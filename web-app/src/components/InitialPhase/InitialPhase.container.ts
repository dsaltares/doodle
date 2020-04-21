import { connect } from 'react-redux';
import { AppDispatch } from '../../store';
import InitialPhase from './InitialPhase';
import { RootState } from '../../store/reducers';
import { GameState, Player } from '../../store/game/types';
import pluralize from '../../utils/pluralize';
import { startGame } from '../../store/game';

const MIN_PLAYERS = 2;

const getMessage = (
  missingPlayers: number,
  createdBy: Player,
  player: string,
) => {
  if (missingPlayers > 0) {
    return `Waiting for ${missingPlayers} more ${pluralize('player', 'players', missingPlayers)}`;
  }
  const createdGame = createdBy.id === player;
  if (createdGame) {
    return 'Ready to start?';
  }
  return `Waiting for ${createdBy.name} to start the game`;
}

const mapStateToProps = (state: RootState) => {
  const game = state.game.gameState as GameState;
  const player = state.game.player as string;
  const numPlayers = Object.keys(game.players).length;
  const missingPlayers = Math.max(0, MIN_PLAYERS - numPlayers);
  const createdBy = game.players[game.createdBy];
  const createdGame = createdBy.id === player;

  return {
    message: getMessage(missingPlayers, createdBy, player),
    startVisible: createdGame,
    startDisabled: missingPlayers > 0,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onStart: () => dispatch(startGame()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InitialPhase);