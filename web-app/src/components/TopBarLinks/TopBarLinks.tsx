import React, {
  FunctionComponent,
  useState,
} from 'react';

import Grid from '@material-ui/core/Grid';
import SvgIcon from '@material-ui/core/SvgIcon';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HelpIcon from '@material-ui/icons/Help';

import useStyles from './TopBarLinks.styles';
import { ReactComponent as GitHub } from './github.svg';
import { ReactComponent as Kofi } from './ko-fi.svg';
import { HowToPlayDialog } from '../HowToPlay';

const openUrl = (url: string) => window.open(url, '_blank');

type Props = {
  gameStarted: boolean,
};

const TopBarLinks: FunctionComponent<Props> = ({
  gameStarted,
}) => {
  const classes = useStyles();

  const [helpOpen, setHelpOpen] = useState(false);
  const handleHelpClicked = () => setHelpOpen(true);
  const handleHelpClosed = () => setHelpOpen(false);

  const howToPlay = gameStarted
    ? (
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
    )
    : undefined;

  return (
    <>
      <Grid container direction="row" justify="flex-start" alignItems="center" spacing={0}>
        {howToPlay}
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
