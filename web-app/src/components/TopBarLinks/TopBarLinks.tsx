import React, { useState } from 'react';

import Grid from '@material-ui/core/Grid';
import SvgIcon from '@material-ui/core/SvgIcon';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HelpIcon from '@material-ui/icons/Help';

import useStyles from './TopBarLinks.styles';
import { ReactComponent as GitHub } from './github.svg';
import { ReactComponent as Kofi } from './ko-fi.svg';
import HowToPlayDialog from '../HowToPlayDialog';

const openUrl = (url: string) => window.open(url, '_blank');

const TopBarLinks = () => {
  const classes = useStyles();

  const [helpOpen, setHelpOpen] = useState(false);
  const handleHelpClicked = () => setHelpOpen(true);
  const handleHelpClosed = () => setHelpOpen(false);

  return (
    <>
      <Grid container direction="row" justify="flex-start" alignItems="center" spacing={0}>
        <Grid item>
          <Button
            className={classes.iconButton}
            variant="contained"
            color="primary"
            onClick={handleHelpClicked}
            startIcon={<HelpIcon />}
          >
            How to play
          </Button>
        </Grid>
        <Grid item>
          <Tooltip title="Support the project on Ko-fi ☕" placement="bottom">
            <IconButton
              className={classes.iconButton}
              onClick={() => openUrl('https://ko-fi.com/dsaltares')}
            >
              <SvgIcon>
                <Kofi />
              </SvgIcon>
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title="Check out the source code! 💻" placement="bottom">
            <IconButton
              className={classes.iconButton}
              onClick={() => openUrl('https://github.com/dsaltares/doodle')}
            >
              <SvgIcon>
                <GitHub href="https://github.com/dsaltares/doodle"/>
              </SvgIcon>
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    <HowToPlayDialog open={helpOpen} onClose={handleHelpClosed} />
    </>
  );
};

export default TopBarLinks;
