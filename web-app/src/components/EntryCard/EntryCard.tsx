import React, {
  FunctionComponent,
  ReactNode
} from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import Avatar from '@material-ui/core/Avatar';
import Avataaar from 'avataaars';

import { Avatar as AvatarType } from '../../store/game/types';
import useStyles from './EntryCard.styles';

type Props = {
  name: string,
  avatar: AvatarType,
  entry: ReactNode,
  onClick?: () => void,
}

const EntryCard: FunctionComponent<Props> = ({
  name,
  avatar,
  entry,
  onClick,
}) => {
  const classes = useStyles();

  const content = [
    <CardHeader
      avatar={(
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
      )}
      title={name}
    />,
    entry,
  ];
  const wrapped = onClick
    ? (<CardActionArea>{content}</CardActionArea>)
    : content;

  return (
    <Grid item xs={12}>
      <Card onClick={onClick}>
        {wrapped}
      </Card>
    </Grid>
  );
}

export default EntryCard;
