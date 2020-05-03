import React, { FunctionComponent } from 'react';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

import PlayerListItem from '../PlayerListItem';

export type Props = {
  visible: boolean,
  playerIds: string[],
}

const WaitingPlayerList: FunctionComponent<Props> = ({
  visible,
  playerIds,
}) => {
  if (!visible) {
    return null;
  }

  return (
    <List subheader={(
      <ListSubheader>Waiting players</ListSubheader>
    )}>
      {
        playerIds.map(id => (<PlayerListItem key={id} id={id} />))
      }
    </List>
  );
};

export default WaitingPlayerList;
