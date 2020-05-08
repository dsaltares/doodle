import React, { FunctionComponent } from 'react';

import Grid from '@material-ui/core/Grid';

import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';
import DeleteIcon from '@material-ui/icons/Delete';

import ToolBarButton from '../ToolBarButton';
import LineWidthPickerButton from '../LineWidthPickerButton';
import ColorPickerButton from '../ColorPickerButton';
import ToolPickerButton from '../ToolPickerButton';

export type Tool = 'pencil' | 'eraser'

type Props = {
  lineWidth?: number,
  onLineWidthChange: (width: number) => void,
  color?: string,
  onColorChange: (color: string) => void,
  tool?: Tool
  onToolChange: (tool: Tool) => void,
  canUndo?: boolean,
  onUndo: () => void,
  canRedo?: boolean,
  onRedo: () => void,
  onEraseAll: () => void,
}

const ToolBar: FunctionComponent<Props> = ({
  lineWidth = 5,
  onLineWidthChange,
  color = '#f44336',
  onColorChange,
  tool = 'pencil',
  onToolChange,
  canUndo = false,
  onUndo,
  canRedo = false,
  onRedo,
  onEraseAll,
}) => (
  <Grid
    container
    direction="column"
    spacing={0}
    alignItems="center"
  >
    <LineWidthPickerButton
      lineWidth={lineWidth}
      onLineWidthChange={onLineWidthChange}
    />
    <ColorPickerButton
      color={color}
      onColorChange={onColorChange}
    />
    <ToolPickerButton
      tool={tool}
      onToolChange={onToolChange}
    />
    <ToolBarButton
      title="Undo"
      icon={<UndoIcon />}
      onClick={onUndo}
      disabled={!canUndo}
    />
    <ToolBarButton
      title="Redo"
      icon={<RedoIcon />}
      onClick={onRedo}
      disabled={!canRedo}
    />
    <ToolBarButton
      title="Erase all"
      icon={<DeleteIcon />}
      onClick={onEraseAll}
    />
  </Grid>
);

export default ToolBar;
