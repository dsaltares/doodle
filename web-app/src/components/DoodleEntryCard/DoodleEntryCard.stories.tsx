import React from 'react';
import { action } from '@storybook/addon-actions';
import Grid from '@material-ui/core/Grid';

import DoodleEntryCard from './DoodleEntryCard';

export default { title: 'DoodleEntryCard' }

export const noActions = () => (
  <DoodleEntryCard
    name="David Saltares"
    avatar="https://lh3.googleusercontent.com/-JLCZSNfFCAo/AAAAAAAAAAI/AAAAAAAAAAA/AAKWJJMxBK68hW8MZHdaJjlLMY_hx16qxw.CMID/s192-c/photo.jpg"
    image="https://i.imgur.com/DaR8LAb.png"
    order={1}
  />
);

export const withActions = () => (
  <DoodleEntryCard
    name="David Saltares"
    avatar="https://lh3.googleusercontent.com/-JLCZSNfFCAo/AAAAAAAAAAI/AAAAAAAAAAA/AAKWJJMxBK68hW8MZHdaJjlLMY_hx16qxw.CMID/s192-c/photo.jpg"
    image="https://i.imgur.com/DaR8LAb.png"
    order={1}
    onClick={action('onClick')}
  />
);


export const cardGrid = () => (
  <Grid container direction="row" spacing={3}>
    <Grid item xs={5}>
      <DoodleEntryCard
        name="David Saltares"
        avatar="https://lh3.googleusercontent.com/-JLCZSNfFCAo/AAAAAAAAAAI/AAAAAAAAAAA/AAKWJJMxBK68hW8MZHdaJjlLMY_hx16qxw.CMID/s192-c/photo.jpg"
        image="https://i.imgur.com/DaR8LAb.png"
        order={1}
        onClick={action('onClick')}
      />
    </Grid>
    <Grid item xs={5}>
      <DoodleEntryCard
        name="David Saltares"
        avatar="https://lh3.googleusercontent.com/-JLCZSNfFCAo/AAAAAAAAAAI/AAAAAAAAAAA/AAKWJJMxBK68hW8MZHdaJjlLMY_hx16qxw.CMID/s192-c/photo.jpg"
        image="https://i.imgur.com/DaR8LAb.png"
        order={2}
        onClick={action('onClick')}
      />
    </Grid>
    <Grid item xs={5}>
      <DoodleEntryCard
        name="David Saltares"
        avatar="https://lh3.googleusercontent.com/-JLCZSNfFCAo/AAAAAAAAAAI/AAAAAAAAAAA/AAKWJJMxBK68hW8MZHdaJjlLMY_hx16qxw.CMID/s192-c/photo.jpg"
        image="https://i.imgur.com/DaR8LAb.png"
        order={3}
        onClick={action('onClick')}
      />
    </Grid>
  </Grid>
);
