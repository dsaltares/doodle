import React from 'react';
import Emoji from './Emoji';

export default { title: 'Emoji' };

export const noLabel = () => <Emoji symbol="🤯" />;

export const label = () => <Emoji symbol="👍" label="thumbs up" />;
