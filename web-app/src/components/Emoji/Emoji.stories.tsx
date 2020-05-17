import React, { FunctionComponent } from 'react';
import Emoji from './Emoji';

export default { title: 'Emoji' };

export const noLabel: FunctionComponent = () => <Emoji symbol="🤯" />;

export const label: FunctionComponent = () => (
  <Emoji symbol="👍" label="thumbs up" />
);
