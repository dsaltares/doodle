import React, { FunctionComponent } from 'react';

import EntryChoiceAcknowledge from './EntryChoiceAcknowledge';
import EntryChoiceList from './EntryChoiceList';
import { Entry } from '../../store/game/types';

export type StateProps = {
  entries: Entry[];
  concept: string;
  stackPlayerName: string;
  currentPlayerChooses: boolean;
  chosenPlayerId?: string;
  chosenPlayerName?: string;
  acknowledged: boolean;
};

export type DispatchProps = {
  onChooseEntry: (playerId: string) => void;
  onAcknowledge: () => void;
};

type Props = StateProps & DispatchProps;

const EntryChoicePhase: FunctionComponent<Props> = ({
  entries,
  concept,
  stackPlayerName,
  currentPlayerChooses,
  chosenPlayerId,
  chosenPlayerName,
  acknowledged,
  onChooseEntry,
  onAcknowledge,
}) =>
  chosenPlayerId ? (
    <EntryChoiceAcknowledge
      winningEntry={
        entries.find((entry) => entry.author === chosenPlayerId) as Entry
      }
      concept={concept}
      stackPlayerName={stackPlayerName}
      currentPlayerChose={currentPlayerChooses}
      chosenPlayerName={chosenPlayerName as string}
      acknowledged={acknowledged}
      onAcknowledge={onAcknowledge}
    />
  ) : (
    <EntryChoiceList
      entries={entries}
      concept={concept}
      stackPlayerName={stackPlayerName}
      currentPlayerChooses={currentPlayerChooses}
      onChooseEntry={onChooseEntry}
    />
  );

export default EntryChoicePhase;
