import React, {
  FunctionComponent,
  MouseEvent,
} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

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
      <Emoji symbol="💡" />
    </ListItemAvatar>
    <ListItemText primary={concept}/>
  </ListItem>
);

export default ConceptListItem;
