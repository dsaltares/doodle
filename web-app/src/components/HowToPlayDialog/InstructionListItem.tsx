import React, { FunctionComponent }  from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

import Emoji from '../Emoji';
import useStyles from './InstructionListItem.styles';

type Props = {
  emoji: string,
  text: string,
  divider: boolean,
};

const InstructionListItem: FunctionComponent<Props> = ({
  emoji,
  text,
  divider,
}) => {
  const classes = useStyles();

  return (
    <ListItem divider={divider}>
      <ListItemAvatar className={classes.emoji}>
        <Emoji symbol={emoji}></Emoji>
      </ListItemAvatar>
      <ListItemText primary={text} />
    </ListItem>
  );
};

export default InstructionListItem;
