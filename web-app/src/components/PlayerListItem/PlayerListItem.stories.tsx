import React from 'react';
import List from '@material-ui/core/List';
import PlayerListItem from './PlayerListItem';

export default { title: 'PlayerListItem' }

export const avatars = () => (
  <List>
    <PlayerListItem
      name="David Saltares"
      points={0}
      state="Ready"
      avatar={{
        topType: 'Eyepatch',
        accessoriesType: 'Prescription01',
        hairColor: 'BrownDark',
        facialHairType: 'BeardMajestic',
        clotheType: 'Overall',
        clotheColor: 'Gray01',
        eyeType: 'EyeRoll',
        eyebrowType: 'RaisedExcitedNatural',
        mouthType: 'ScreamOpen',
        skinColor: 'Light',
      }}
    />
    <PlayerListItem
      name="David Saltares"
      avatar={{
        topType: 'Eyepatch',
        accessoriesType: 'Prescription01',
        hairColor: 'BrownDark',
        facialHairType: 'BeardMajestic',
        clotheType: 'Overall',
        clotheColor: 'Gray01',
        eyeType: 'EyeRoll',
        eyebrowType: 'RaisedExcitedNatural',
        mouthType: 'ScreamOpen',
        skinColor: 'Light',
      }}
      points={0}
      state="Ready"
    />
  </List>
);

export const states = () => (
  <List>
    <PlayerListItem
      name="David Saltares"
      points={0}
      state="Ready"
      avatar={{
        topType: 'Eyepatch',
        accessoriesType: 'Prescription01',
        hairColor: 'BrownDark',
        facialHairType: 'BeardMajestic',
        clotheType: 'Overall',
        clotheColor: 'Gray01',
        eyeType: 'EyeRoll',
        eyebrowType: 'RaisedExcitedNatural',
        mouthType: 'ScreamOpen',
        skinColor: 'Light',
      }}
    />
    <PlayerListItem
      name="David Saltares"
      avatar={{
        topType: 'Eyepatch',
        accessoriesType: 'Prescription01',
        hairColor: 'BrownDark',
        facialHairType: 'BeardMajestic',
        clotheType: 'Overall',
        clotheColor: 'Gray01',
        eyeType: 'EyeRoll',
        eyebrowType: 'RaisedExcitedNatural',
        mouthType: 'ScreamOpen',
        skinColor: 'Light',
      }}
      points={1}
      state="Thinking"
    />
    <PlayerListItem
      name="David Saltares"
      avatar={{
        topType: 'Eyepatch',
        accessoriesType: 'Prescription01',
        hairColor: 'BrownDark',
        facialHairType: 'BeardMajestic',
        clotheType: 'Overall',
        clotheColor: 'Gray01',
        eyeType: 'EyeRoll',
        eyebrowType: 'RaisedExcitedNatural',
        mouthType: 'ScreamOpen',
        skinColor: 'Light',
      }}
      points={2}
      state="Guessing"
    />
    <PlayerListItem
      name="David Saltares"
      avatar={{
        topType: 'Eyepatch',
        accessoriesType: 'Prescription01',
        hairColor: 'BrownDark',
        facialHairType: 'BeardMajestic',
        clotheType: 'Overall',
        clotheColor: 'Gray01',
        eyeType: 'EyeRoll',
        eyebrowType: 'RaisedExcitedNatural',
        mouthType: 'ScreamOpen',
        skinColor: 'Light',
      }}
      points={3}
      state="Drawing"
    />
  </List>
);
