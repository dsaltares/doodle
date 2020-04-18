import React from 'react';
import Typography from '@material-ui/core/Typography';

import EntryCard from './EntryCard';

export default { title: 'EntryCard' }

export const noActions = () => (
  <EntryCard
    name="David Saltares"
    avatar="https://lh3.googleusercontent.com/-JLCZSNfFCAo/AAAAAAAAAAI/AAAAAAAAAAA/AAKWJJMxBK68hW8MZHdaJjlLMY_hx16qxw.CMID/s192-c/photo.jpg"
    order={1}
    entry={(
      <Typography>This is the entry content</Typography>
    )}
  />
);
