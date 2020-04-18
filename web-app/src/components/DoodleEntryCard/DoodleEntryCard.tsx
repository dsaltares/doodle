import React, { FunctionComponent } from 'react';
import CardMedia from '@material-ui/core/CardMedia';

import EntryCard from '../EntryCard';

type Props = {
  name: string,
  avatar: string,
  image: string,
  order: number,
  onClick?: () => void,
}

const DoodleEntryCard: FunctionComponent<Props> = ({
  name,
  avatar,
  image,
  order,
  onClick,
}) => (
  <EntryCard
    name={name}
    avatar={avatar}
    order={order}
    entry={(
      <CardMedia
        component="img"
        image={image}
        width="500"
        title={`Entry by ${name}`}
      />
    )}
    onClick={onClick}
  />
);

export default DoodleEntryCard;
