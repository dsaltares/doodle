import React, { FunctionComponent } from 'react';

import { CirclePicker, ColorResult } from 'react-color';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import ExpandableToolBarButton from '../ExpandableToolBarButton';

type Props = {
  color: string,
  onColorChange: (color: string) => void,
}

const ColorPickerButton: FunctionComponent<Props> = ({
  color,
  onColorChange,
}) => {
  const handleOnChangeComplete = (color: ColorResult) => onColorChange(color.hex);

  return (
    <ExpandableToolBarButton
      title="Color"
      icon={<FiberManualRecordIcon style={{ color }}/>}
      renderContent={({ close }) => (
        <CirclePicker
          color={color}
          onChangeComplete={(color) => {
            close();
            handleOnChangeComplete(color);
          }}
        />
      )}
    />
  );
};

export default ColorPickerButton;
