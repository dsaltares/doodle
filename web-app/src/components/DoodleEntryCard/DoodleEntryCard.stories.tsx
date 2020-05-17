import React from 'react';
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

export const noActions = () => (
  <DoodleEntryCard
    name="David Saltares"
    avatar={avatar}
    image="https://i.imgur.com/DaR8LAb.png"
  />
);

export const withActions = () => (
  <DoodleEntryCard
    name="David Saltares"
    avatar={avatar}
    image="https://i.imgur.com/DaR8LAb.png"
    onClick={action('onClick')}
  />
);

export const cardGrid = () => (
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
