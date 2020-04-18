import React from 'react';
import { action } from '@storybook/addon-actions';
import Grid from '@material-ui/core/Grid';

import ConceptEntryCard from './ConceptEntryCard';

export default { title: 'ConceptEntryCard' }

export const noActions = () => (
  <ConceptEntryCard
    name="David Saltares"
    avatar="https://lh3.googleusercontent.com/-JLCZSNfFCAo/AAAAAAAAAAI/AAAAAAAAAAA/AAKWJJMxBK68hW8MZHdaJjlLMY_hx16qxw.CMID/s192-c/photo.jpg"
    concept="Throwing a frog over the shoulder"
    order={1}
  />
);

export const withActions = () => (
  <ConceptEntryCard
    name="David Saltares"
    avatar="https://lh3.googleusercontent.com/-JLCZSNfFCAo/AAAAAAAAAAI/AAAAAAAAAAA/AAKWJJMxBK68hW8MZHdaJjlLMY_hx16qxw.CMID/s192-c/photo.jpg"
    concept="Throwing a frog over the shoulder"
    order={1}
    onClick={action('onClick')}
  />
);


export const cardGrid = () => (
  <Grid container direction="row" spacing={3}>
    <Grid item xs={5}>
      <ConceptEntryCard
        name="David Saltares"
        avatar="https://lh3.googleusercontent.com/-JLCZSNfFCAo/AAAAAAAAAAI/AAAAAAAAAAA/AAKWJJMxBK68hW8MZHdaJjlLMY_hx16qxw.CMID/s192-c/photo.jpg"
        concept="Seeing a ghost"
        order={1}
        onClick={action('onClick')}
      />
    </Grid>
    <Grid item xs={5}>
      <ConceptEntryCard
        name="David Saltares"
        avatar="https://lh3.googleusercontent.com/-JLCZSNfFCAo/AAAAAAAAAAI/AAAAAAAAAAA/AAKWJJMxBK68hW8MZHdaJjlLMY_hx16qxw.CMID/s192-c/photo.jpg"
        concept="Buffy the Vampire Slayer"
        order={2}
        onClick={action('onClick')}
      />
    </Grid>
    <Grid item xs={5}>
      <ConceptEntryCard
        name="David Saltares"
        avatar="https://lh3.googleusercontent.com/-JLCZSNfFCAo/AAAAAAAAAAI/AAAAAAAAAAA/AAKWJJMxBK68hW8MZHdaJjlLMY_hx16qxw.CMID/s192-c/photo.jpg"
        concept="Killing a vampire"
        order={3}
        onClick={action('onClick')}
      />
    </Grid>
  </Grid>
);
