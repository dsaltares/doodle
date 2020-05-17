import React, { FunctionComponent } from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import EntryCard from '../EntryCard';
import { Avatar } from '../../store/game/types';

type Props = {
  name: string;
  avatar: Avatar;
  concept: string;
  onClick?: () => void;
};

const ConceptEntryCard: FunctionComponent<Props> = ({
  name,
  avatar,
  concept,
  onClick,
}) => (
  <EntryCard
    name={name}
    avatar={avatar}
    entry={
      <CardContent>
        <Typography variant="h4">{concept}</Typography>
      </CardContent>
    }
    onClick={onClick}
  />
);

export default ConceptEntryCard;
