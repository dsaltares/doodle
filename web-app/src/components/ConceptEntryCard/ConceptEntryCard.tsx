import React, { FunctionComponent } from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import EntryCard from '../EntryCard';

type Props = {
  name: string,
  avatar: string,
  concept: string,
  order: number,
  onClick?: () => void,
}

const ConceptEntryCard: FunctionComponent<Props> = ({
  name,
  avatar,
  concept,
  order,
  onClick,
}) => (
  <EntryCard
    name={name}
    avatar={avatar}
    order={order}
    entry={(
      <CardContent>
        <Typography variant="h4">{concept}</Typography>
      </CardContent>
    )}
    onClick={onClick}
  />
);

export default ConceptEntryCard;
