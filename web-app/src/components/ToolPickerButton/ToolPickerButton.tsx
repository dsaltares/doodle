import React, { FunctionComponent } from 'react';

import CreateIcon from '@material-ui/icons/Create';
import SvgIcon from '@material-ui/core/SvgIcon';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import ExpandableToolBarButton from '../ExpandableToolBarButton';
import { ReactComponent as EraserIcon } from './eraser.svg';

type Tool = 'pencil' | 'eraser';

type Props = {
  tool: Tool;
  onToolChange: (tool: Tool) => void;
};

const getIconForTool = (tool: Tool) =>
  tool === 'pencil' ? (
    <CreateIcon />
  ) : (
    <SvgIcon>
      <EraserIcon />
    </SvgIcon>
  );

const ToolPickerButton: FunctionComponent<Props> = ({ tool, onToolChange }) => (
  <ExpandableToolBarButton
    title="Tool"
    icon={getIconForTool(tool)}
    renderContent={({ close }) => (
      <ToggleButtonGroup
        value={tool}
        exclusive
        onChange={(_event, newTool) => {
          close();
          onToolChange(newTool);
        }}
        aria-label="text alignment"
      >
        <ToggleButton value="pencil" aria-label="pencil">
          <CreateIcon />
        </ToggleButton>
        <ToggleButton value="eraser" aria-label="eraser">
          <SvgIcon>
            <EraserIcon />
          </SvgIcon>
        </ToggleButton>
      </ToggleButtonGroup>
    )}
  />
);

export default ToolPickerButton;
