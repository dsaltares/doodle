import React, { FunctionComponent } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Avataaar from 'avataaars';

import Emoji from '../Emoji';
import pluralize from '../../utils/pluralize';
import useStyles from './PlayerListItem.styles';

export type PlayerState = 'Ready' | 'Thinking' | 'Guessing' | 'Drawing' | 'Looking';

type Avatar = {
  topType: string,
  accessoriesType: string,
  hairColor: string,
  facialHairType: string,
  clotheType: string,
  clotheColor: string,
  eyeType: string,
  eyebrowType: string,
  mouthType: string,
  skinColor: string,
}

type Props = {
  name: string,
  avatar: Avatar,
  points: number,
  state?: PlayerState,
}

const statusEmojis = {
  Ready: '✅',
  Looking: '👀',
  Thinking: '🤔',
  Guessing: '🕵️‍♂️',
  Drawing: '✏️',
}

const PlayerItem: FunctionComponent<Props> = ({
  name,
  avatar,
  points,
  state,
}) => {
  const classes = useStyles();
  return (
    <ListItem divider>
      <ListItemAvatar>
        <Avatar variant="rounded" alt={name} className={classes.avatar}>
          <Avataaar
            avatarStyle="Circle"
            topType={avatar.topType}
            accessoriesType={avatar.accessoriesType}
            hairColor={avatar.hairColor}
            facialHairType={avatar.facialHairType}
            clotheType={avatar.clotheType}
            clotheColor={avatar.clotheColor}
            eyeType={avatar.eyeType}
            eyebrowType={avatar.eyebrowType}
            mouthType={avatar.mouthType}
            skinColor={avatar.skinColor}
          />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={name}
        secondary={`${points} ${pluralize('point', 'points', points)}`}
      />
      {
        state && (
          <ListItemSecondaryAction>
            <Typography variant="h5">
              <Emoji symbol={statusEmojis[state]} />
            </Typography>
          </ListItemSecondaryAction>
        )
      }
    </ListItem>
  );
};

export default PlayerItem;
