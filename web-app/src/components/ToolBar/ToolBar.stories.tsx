import React, { FunctionComponent } from 'react';
import { action } from '@storybook/addon-actions';

import ToolBar from './ToolBar';

export default { title: 'ToolBar' };

export const defaultState: FunctionComponent = () => (
  <ToolBar
    onLineWidthChange={action('onLineWidthChange')}
    onColorChange={action('onColorChange')}
    onToolChange={action('onToolChange')}
    onUndo={action('onUndo')}
    onRedo={action('onRedo')}
    onEraseAll={action('onEraseAll')}
  />
);
