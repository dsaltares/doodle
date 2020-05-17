import React, { useState } from 'react';

import ColorPickerButton from './ColorPickerButton';

export default { title: 'ColorPickerButton' };

export const Picker = () => {
  const [color, setColor] = useState<string | undefined>(undefined);
  return <ColorPickerButton color={color} onColorChange={setColor} />;
};
