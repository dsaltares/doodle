import React, { FunctionComponent } from 'react';
import CardMedia from '@material-ui/core/CardMedia';

import EntryCard from '../EntryCard';
import { Avatar } from '../../store/game/types';

export type StateProps = {
  name: string;
  avatar: Avatar;
};

type Props = StateProps & {
  image: string;
  onClick?: () => void;
};

const DoodleEntryCard: FunctionComponent<Props> = ({
  name,
  avatar,
  image,
  onClick,
}) => (
  <EntryCard
    name={name}
    avatar={avatar}
    entry={
      <CardMedia
        component="img"
        image={image}
        width="500"
        title={`Entry by ${name}`}
      />
    }
    onClick={onClick}
  />
);

export default DoodleEntryCard;
