import React, { FunctionComponent } from 'react';

import CreateIcon from '@material-ui/icons/Create';
import ClearIcon from '@material-ui/icons/Clear';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import ExpandableToolBarButton from '../ExpandableToolBarButton';

type Tool = 'pencil' | 'eraser'

type Props = {
  tool: Tool,
  onToolchange: (tool: Tool) => void,
}

const getIconForTool = (tool: Tool) => (
  tool === 'pencil'
    ? <CreateIcon />
    : <ClearIcon />
);

const ToolPickerButton: FunctionComponent<Props> = ({
  tool,
  onToolchange,
}) => (
  <ExpandableToolBarButton
    title="Color"
    icon={getIconForTool(tool)}
    renderContent={({ close }) => (
      <ToggleButtonGroup
        value={tool}
        exclusive
        onChange={(_event, newTool) => {
          close();
          onToolchange(newTool)
        }}
        aria-label="text alignment"
      >
        <ToggleButton value="pencil" aria-label="pencil">
          <CreateIcon />
        </ToggleButton>
        <ToggleButton value="eraser" aria-label="eraser">
          <ClearIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    )}
  />
);

export default ToolPickerButton;
