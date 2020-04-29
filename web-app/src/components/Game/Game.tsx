import React, { FunctionComponent } from 'react';
import Typography from '@material-ui/core/Typography';

import Connecting from '../Connecting';
import InitialPhase from '../InitialPhase';
import ConceptChoicePhase from '../ConceptChoicePhase';
import CreateEntryPhase from '../CreateEntryPhase';
import EntryChoicePhase from '../EntryChoicePhase';
import useMountEffect from '../../utils/useMountEffect';

type Props = {
  connected: boolean,
  phaseName: string,
  connect: () => void,
}

const Game: FunctionComponent<Props> = ({
  connected,
  phaseName,
  connect,
}) => {
  useMountEffect(() => {
    connect();
  });

  if (!connected) {
    return <Connecting />;
  }

  switch (phaseName) {
    case 'initial':
      return <InitialPhase />;
    case 'conceptChoice':
      return <ConceptChoicePhase />;
    case 'createEntry':
      return <CreateEntryPhase />;
    case 'entryChoice':
      return <EntryChoicePhase />
    default:
      return <Typography>Unknown phase</Typography>
  }
};

export default Game;
