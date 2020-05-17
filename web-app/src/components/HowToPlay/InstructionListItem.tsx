import React, { FunctionComponent } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import Emoji from '../Emoji';

type Props = {
  emoji: string;
  text: string;
  divider: boolean;
};

const InstructionListItem: FunctionComponent<Props> = ({
  emoji,
  text,
  divider,
}) => (
  <ListItem divider={divider}>
    <ListItemAvatar>
      <Typography variant="h4">
        <Emoji symbol={emoji} />
      </Typography>
    </ListItemAvatar>
    <ListItemText primary={text} />
  </ListItem>
);

export default InstructionListItem;
