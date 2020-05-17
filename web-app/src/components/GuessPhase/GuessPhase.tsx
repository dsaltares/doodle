import React, { FunctionComponent, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import useStyles from './GuessPhase.styles';
import Emoji from '../Emoji';
import MainContent from '../MainContent';

type Props = {
  author: string | undefined;
  image: string;
  submitted: boolean;
  onSubmit: (image: string) => void;
};

const GuessPhase: FunctionComponent<Props> = ({
  author,
  image,
  submitted,
  onSubmit,
}) => {
  const classes = useStyles();
  const [guess, setGuess] = useState('');
  const handleGuessChanged = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setGuess(event.target.value);
  };
  const handleSubmitClicked = (): void => {
    onSubmit(guess);
  };

  const message = submitted
    ? 'Waiting for everyone to guess.'
    : `Guess what ${author} drew.`;
  const emoji = submitted ? '⏳' : '🕵️‍♂️';

  return (
    <MainContent width={800}>
      <Grid item xs={12}>
        <Typography>
          <Emoji symbol={emoji} />
          <span> {message}</span>
        </Typography>
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
          <Emoji symbol="🎨" />
          <span>Done</span>
        </Button>
      </Grid>
    </MainContent>
  );
};

export default GuessPhase;
