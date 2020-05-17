import React, { FunctionComponent } from 'react';

import Slider from '@material-ui/core/Slider';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import ExpandableToolBarButton from '../ExpandableToolBarButton';
import useStyles from './LineWidthPickerButton.styles';

type Props = {
  lineWidth: number;
  onLineWidthChange: (width: number) => void;
};

const valueText = (value: number): string => `${value} px`;

const LineWidthPickerButton: FunctionComponent<Props> = ({
  lineWidth,
  onLineWidthChange,
}) => {
  const classes = useStyles();

  const handleChange = (_e: unknown, newValue: number | number[]): void => {
    onLineWidthChange(Array.isArray(newValue) ? newValue[0] : newValue);
  };

  return (
    <ExpandableToolBarButton
      title="Line width"
      icon={<FiberManualRecordIcon />}
      renderContent={(): React.ReactNode => (
        <div className={classes.root}>
          <Slider
            value={lineWidth}
            getAriaValueText={valueText}
            valueLabelDisplay="on"
            step={1}
            min={1}
            max={50}
            onChange={handleChange}
          />
        </div>
      )}
    />
  );
};

export default LineWidthPickerButton;
