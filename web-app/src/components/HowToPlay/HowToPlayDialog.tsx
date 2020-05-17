import React, { FunctionComponent } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import InstructionList from './InstructionList';

type Props = {
  open: boolean;
  onClose: () => void;
};

const HowToPlayDialog: FunctionComponent<Props> = ({ open, onClose }) => {
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
          <Grid item>How to play</Grid>
          <Grid item>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <InstructionList />
      </DialogContent>
    </Dialog>
  );
};

export default HowToPlayDialog;
