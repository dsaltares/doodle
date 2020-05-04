import React, {
  useState,
  FunctionComponent,
  FormEvent,
} from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import MenuContainer from '../MenuContainer';
import Emoji from '../Emoji';
import useStyles from './Menu.styles';

export type GameMode = 'newGame' | 'joinGame';

export type StartGameParams = {
  mode: GameMode,
  name: string,
  code: string,
  goToGame: (code: string) => any,
}

interface Props extends RouteComponentProps<any> {
  startGame: (params: StartGameParams) => void,
}

const Menu: FunctionComponent<Props> = ({
  startGame,
  history,
}) => {
  const classes = useStyles();

  const [mode, setMode] = useState('newGame');
  const handleModeChange = (
    (_event: any, newMode: string) => setMode(newMode)
  );

  const [name, setName] = useState('');
  const handleNameChange = (
    (event:React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)
  );

  const [code, setCode] = useState('');
  const handleGameCodeChange = (
    (event:React.ChangeEvent<HTMLInputElement>) => setCode(event.target.value)
  );

  const hasName = name.length > 0;
  const hasGameCode = code.length > 0;
  const canStartGame = hasName && (mode === 'newGame' || hasGameCode);

  const handleGoClicked = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (canStartGame) {
      startGame({
        mode: mode as GameMode,
        name,
        code,
        goToGame: (code: string) => history.push(`/game/${code}`),
      });
    }
  };

  const codeField = mode === 'joinGame'
    ? (
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          label="Game code"
          onChange={handleGameCodeChange}
          fullWidth
        />
      </Grid>
    )
    : null;

  return (
    <MenuContainer>
      <form onSubmit={handleGoClicked}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container direction="row" justify="center">
              <ToggleButtonGroup
                value={mode}
                onChange={handleModeChange}
                exclusive
                aria-label="game mode"
                className={classes.buttonGroup}
              >
                <ToggleButton value="newGame" className={classes.button}>
                  <Emoji symbol="✏️"/>
                  New Game
                </ToggleButton>
                <ToggleButton value="joinGame" className={classes.button}>
                  <Emoji symbol="👥"/>
                  <span>Join Game</span>
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Player name"
              value={name}
              onChange={handleNameChange}
              fullWidth
            />
          </Grid>
          {codeField}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!canStartGame}
            >
              <Emoji symbol="🙌"/>
              <span>Go!</span>
            </Button>
          </Grid>
        </Grid>
      </form>
    </MenuContainer>
  );
};

export default withRouter(Menu);
