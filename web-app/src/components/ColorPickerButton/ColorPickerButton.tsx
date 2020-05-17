import React, { FunctionComponent } from 'react';

import { CirclePicker, ColorResult } from 'react-color';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import ExpandableToolBarButton from '../ExpandableToolBarButton';
import Colors from './Colors';

type Props = {
  color?: string;
  onColorChange: (color: string) => void;
};

const ColorPickerButton: FunctionComponent<Props> = ({
  color = Colors[0],
  onColorChange,
}) => {
  const handleOnChangeComplete = (color: ColorResult): void => {
    onColorChange(color.hex);
  };

  return (
    <ExpandableToolBarButton
      title="Color"
      icon={<FiberManualRecordIcon style={{ color }} />}
      renderContent={({ close }): React.ReactNode => (
        <CirclePicker
          colors={Colors}
          color={color}
          onChangeComplete={(color): void => {
            close();
            handleOnChangeComplete(color);
          }}
        />
      )}
    />
  );
};

export default ColorPickerButton;
