import React from 'react';
import Typography from '@material-ui/core/Typography';

import EntryCard from './EntryCard';

export default { title: 'EntryCard' }

export const noActions = () => (
  <EntryCard
    name="David Saltares"
    avatar={{
      topType: 'Eyepatch',
      accessoriesType: 'Prescription01',
      hairColor: 'BrownDark',
      facialHairType: 'BeardMajestic',
      clotheType: 'Overall',
      clotheColor: 'Gray01',
      eyeType: 'EyeRoll',
      eyebrowType: 'RaisedExcitedNatural',
      mouthType: 'ScreamOpen',
      skinColor: 'Light',
    }}
    entry={(
      <Typography>This is the entry content</Typography>
    )}
  />
);
