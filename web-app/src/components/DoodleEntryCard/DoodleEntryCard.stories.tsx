import React, { FunctionComponent } from 'react';
import { action } from '@storybook/addon-actions';
import Grid from '@material-ui/core/Grid';

import DoodleEntryCard from './DoodleEntryCard';

export default { title: 'DoodleEntryCard' };

const avatar = {
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
};

export const noActions: FunctionComponent = () => (
  <DoodleEntryCard
    name="David Saltares"
    avatar={avatar}
    image="https://i.imgur.com/DaR8LAb.png"
  />
);

export const withActions: FunctionComponent = () => (
  <DoodleEntryCard
    name="David Saltares"
    avatar={avatar}
    image="https://i.imgur.com/DaR8LAb.png"
    onClick={action('onClick')}
  />
);

export const cardGrid: FunctionComponent = () => (
  <Grid container direction="row" spacing={3}>
    <Grid item xs={5}>
      <DoodleEntryCard
        name="David Saltares"
        avatar={avatar}
        image="https://i.imgur.com/DaR8LAb.png"
        onClick={action('onClick')}
      />
    </Grid>
    <Grid item xs={5}>
      <DoodleEntryCard
        name="David Saltares"
        avatar={avatar}
        image="https://i.imgur.com/DaR8LAb.png"
        onClick={action('onClick')}
      />
    </Grid>
    <Grid item xs={5}>
      <DoodleEntryCard
        name="David Saltares"
        avatar={avatar}
        image="https://i.imgur.com/DaR8LAb.png"
        onClick={action('onClick')}
      />
    </Grid>
  </Grid>
);
