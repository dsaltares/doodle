import React, {
  useState,
  FunctionComponent,
} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import MainContent from '../MainContent';
import Emoji from '../Emoji';
import useStyles from './Menu.styles';

export type GameMode = 'newGame' | 'joinGame';

export type StartGameParams = {
  mode: GameMode,
  name: string,
  code: string,
}

type Props = {
  startGame: (params: StartGameParams) => void,
}

const Menu: FunctionComponent<Props> = ({
  startGame,
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

  const handleGoClicked = () => startGame({
    mode: mode as GameMode,
    name,
    code,
  });

  const hasName = name.length > 0;
  const hasGameCode = code.length > 0;
  const canStartGame = hasName && (mode === 'newGame' || hasGameCode);

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
    <MainContent>
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
          label="Name"
          value={name}
          onChange={handleNameChange}
          fullWidth
        />
      </Grid>
      {codeField}
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          disabled={!canStartGame}
          onClick={handleGoClicked}
        >
          <Emoji symbol="🙌"/>
          <span>Go!</span>
        </Button>
      </Grid>
    </MainContent>
  );
};

export default Menu;
