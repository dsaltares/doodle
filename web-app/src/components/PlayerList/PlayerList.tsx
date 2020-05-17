import React, { FunctionComponent } from 'react';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Skeleton from '@material-ui/lab/Skeleton';

import PlayerListItem from '../PlayerListItem';
import useStyles from './PlayerList.styles';

export type Props = {
  visible: boolean;
  playerIds: string[];
  minPlayers: number;
  maxPlayers: number;
  gameStarted: boolean;
};

const PlayerSkeleton = () => {
  const classes = useStyles();
  return (
    <ListItem divider>
      <ListItemAvatar>
        <Skeleton
          variant="circle"
          height={64}
          width={64}
          className={classes.avatar}
        />
      </ListItemAvatar>
      <ListItemText
        primary={<Skeleton variant="text" width={100} />}
        secondary={<Skeleton variant="text" width={50} />}
      />
    </ListItem>
  );
};

const PlayerList: FunctionComponent<Props> = ({
  visible,
  playerIds,
  minPlayers,
  maxPlayers,
  gameStarted,
}) => {
  if (!visible) {
    return null;
  }

  const numPlayers = playerIds.length;
  const remainingPlayers = Math.max(0, maxPlayers - numPlayers);
  const skeletons = !gameStarted
    ? Array.from(Array(remainingPlayers).keys()).map((index) => (
        <PlayerSkeleton key={`skeleton_${index}`} />
      ))
    : [];
  const getMessage = () => {
    if (numPlayers < minPlayers) {
      const needed = minPlayers - numPlayers;
      return `${needed} needed`;
    }
    if (numPlayers === maxPlayers) {
      return 'game full';
    }
    return `${numPlayers}/${maxPlayers}`;
  };

  return (
    <List
      subheader={<ListSubheader>Players - {`${getMessage()}`}</ListSubheader>}
    >
      {[
        ...playerIds.map((id) => <PlayerListItem key={id} id={id} />),
        ...skeletons,
      ]}
    </List>
  );
};

export default PlayerList;
