import React, { FunctionComponent }  from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import List from '@material-ui/core/List';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import InstructionListItem from './InstructionListItem';

const Instructions = [
  {
    emoji: '🎮',
    text: 'Create a game',
  },
  {
    emoji: '🔗',
    text: 'Share the link with friends. Remember, Doodle is best played on a video call!',
  },
  {
    emoji: '🤫',
    text: 'Every player chooses a concept. But keep it secret!',
  },
  {
    emoji: '✏️',
    text: "Draw the concept you picked. Don't worry if you're not an artist, the worse you draw, the more fun the round will be!",
  },
  {
    emoji: '🤔',
    text: 'Now guess what another player drew.',
  },
  {
    emoji: '✏️',
    text: "You will now alternate between drawing other players' guesses and guessing what others drew!",
  },
  {
    emoji: '🙌',
    text: 'When the round is done, each player chooses their favourite entry for their concept.',
  },
];

type Props = {
  open: boolean,
  onClose: () => void,
};

const HowToPlayDialog: FunctionComponent<Props> = ({
  open,
  onClose,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="how-to-play-dialog"
    >
      <DialogTitle id="how-to-play-dialog">
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            How to play
          </Grid>
          <Grid item>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <List>
          {
            Instructions.map((step, index) => (
              <InstructionListItem
                key={index}
                emoji={step.emoji}
                text={step.text}
                divider={index < Instructions.length - 1}
              />
            ))
          }
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default HowToPlayDialog;
