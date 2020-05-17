import React from 'react';
import { action } from '@storybook/addon-actions';
import List from '@material-ui/core/List';
import ConceptListItem from './ConceptListItem';

export default { title: 'ConceptListItem' };

const concepts = [
  'Netflix & Chill',
  'Gold at the end of the rainbox',
  'Throwing a frog',
];

export const someConcepts = () => (
  <List>
    {concepts.map((concept) => (
      <ConceptListItem
        key={concept}
        concept={concept}
        onClick={action(`onClick - ${concept}`)}
      />
    ))}
  </List>
);
