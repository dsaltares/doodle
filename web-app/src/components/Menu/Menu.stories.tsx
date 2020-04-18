import React from 'react';
import Menu from './Menu';
import { action } from '@storybook/addon-actions';

export default { title: 'Menu' }

export const defaultState = () => (
  <Menu startGame={action('startGame')}/>
);
