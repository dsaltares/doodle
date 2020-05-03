import React, {
  FunctionComponent,
  MouseEvent,
} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';

import Emoji from '../Emoji';

type Props = {
  concept: string,
  selected?: boolean,
  disabled?: boolean,
  onClick: (event: MouseEvent<HTMLElement>) => void,
}

const ConceptListItem: FunctionComponent<Props> = ({
  concept,
  selected = false,
  disabled = false,
  onClick,
}) => (
  <ListItem
    divider
    button
    onClick={onClick}
    selected={selected}
    disabled={disabled}
  >
    <ListItemAvatar>
      <Typography variant="h4"><Emoji symbol="💡" /></Typography>
    </ListItemAvatar>
    <ListItemText primary={concept}/>
  </ListItem>
);

export default ConceptListItem;
