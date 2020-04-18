import React, { FunctionComponent } from 'react';
import List from '@material-ui/core/List';
import PlayerListItem from '../PlayerListItem';

export type Props = {
  playerIds: string[],
}

const PlayerList: FunctionComponent<Props> = ({
  playerIds,
}) => (
  <List>
    {
      playerIds.map(id => <PlayerListItem key={id} id={id} />)
    }
  </List>
);

export default PlayerList;
