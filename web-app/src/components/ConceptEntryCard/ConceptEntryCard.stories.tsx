import React from 'react';
import { action } from '@storybook/addon-actions';
import Grid from '@material-ui/core/Grid';

import ConceptEntryCard from './ConceptEntryCard';

export default { title: 'ConceptEntryCard' }

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
  <ConceptEntryCard
    name="David Saltares"
    avatar={avatar}
    concept="Throwing a frog over the shoulder"
  />
);

export const withActions = () => (
  <ConceptEntryCard
    name="David Saltares"
    avatar={avatar}
    concept="Throwing a frog over the shoulder"
    onClick={action('onClick')}
  />
);


export const cardGrid = () => (
  <Grid container direction="row" spacing={3}>
    <Grid item xs={5}>
      <ConceptEntryCard
        name="David Saltares"
        avatar={avatar}
        concept="Seeing a ghost"
        onClick={action('onClick')}
      />
    </Grid>
    <Grid item xs={5}>
      <ConceptEntryCard
        name="David Saltares"
        avatar={avatar}
        concept="Buffy the Vampire Slayer"
        onClick={action('onClick')}
      />
    </Grid>
    <Grid item xs={5}>
      <ConceptEntryCard
        name="David Saltares"
        avatar={avatar}
        concept="Killing a vampire"
        onClick={action('onClick')}
      />
    </Grid>
  </Grid>
);
