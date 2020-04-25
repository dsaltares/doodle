import React from 'react';

import Grid from '@material-ui/core/Grid';
import SvgIcon from '@material-ui/core/SvgIcon';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import useStyles from './TopBarLinks.styles';
import { ReactComponent as GitHub } from './github.svg';
import { ReactComponent as Kofi } from './ko-fi.svg';

const openUrl = (url: string) => window.open(url, '_blank');

const TopBarLinks = () => {
  const classes = useStyles();

  return (
    <Grid container direction="row" justify="flex-start" alignItems="center" spacing={0}>
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
  );
};

export default TopBarLinks;
