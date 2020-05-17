import React, { useState, FunctionComponent } from 'react';

import ColorPickerButton from './ColorPickerButton';

export default { title: 'ColorPickerButton' };

export const Picker: FunctionComponent = () => {
  const [color, setColor] = useState<string | undefined>(undefined);
  return <ColorPickerButton color={color} onColorChange={setColor} />;
};
