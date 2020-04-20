import React, { FunctionComponent } from 'react';

import DrawPhase from '../DrawPhase';
import GuessPhase from '../GuessPhase';

export type EntryType = 'draw' | 'guess';

type Props = {
  type: EntryType,
};

const CreateEntryPhase: FunctionComponent<Props> = ({
  type,
}) => (
  type === 'draw'
    ? <DrawPhase />
    : <GuessPhase />
);

export default CreateEntryPhase;
