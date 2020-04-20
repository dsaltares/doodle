import React, {
  FunctionComponent,
  useState,
} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import useStyles from './GuessPhase.styles';
import Emoji from '../Emoji';

type Props = {
  message: string,
  image: string,
  submitted: boolean,
  onSubmit: (image: string) => void,
};

const GuessPhase: FunctionComponent<Props> = ({
  message,
  image,
  submitted,
  onSubmit,
}) => {
  const classes = useStyles();
  const [guess, setGuess] = useState('');
  const handleGuessChanged = (
    (event:React.ChangeEvent<HTMLInputElement>) => setGuess(event.target.value)
  )
  const handleSubmitClicked = () => {
    onSubmit(guess);
  };

  return (
    <Grid item xs={10}>
      <Paper elevation={1} variant="outlined" className={classes.paper}>
        <Grid container direction="column" spacing={2}>
          <Grid item xs={12}>
            <Typography>{message}</Typography>
          </Grid>
          <Grid item xs={12}>
            <img src={image} alt={message} className={classes.image} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Guess"
              value={guess}
              onChange={handleGuessChanged}
              disabled={submitted}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmitClicked}
              disabled={submitted}
            >
              <Emoji symbol="🤔"/>
              <span>Done</span>
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default GuessPhase;
