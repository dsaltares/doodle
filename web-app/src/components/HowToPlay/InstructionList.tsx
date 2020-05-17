import React, { FunctionComponent } from 'react';
import List from '@material-ui/core/List';

import InstructionListItem from './InstructionListItem';

const Instructions = [
  {
    emoji: '🎮',
    text: 'Create a game.',
  },
  {
    emoji: '🔗',
    text:
      'Share the link with friends. Remember, Doodle is best played on a video call!',
  },
  {
    emoji: '🤫',
    text: 'Every player chooses a concept. But keep it secret!',
  },
  {
    emoji: '✏️',
    text:
      "Draw your concept. Don't know how to draw? Worry not, the worse you draw, the more fun the round will be!",
  },
  {
    emoji: '🤔',
    text: 'Now guess what another player drew.',
  },
  {
    emoji: '✏️',
    text: 'Time to draw what another player guessed!',
  },
  {
    emoji: '🙌',
    text:
      'When the round is done, each player chooses their favourite entry for their concept.',
  },
];

const InstructionList: FunctionComponent = () => (
  <List>
    {Instructions.map((step, index) => (
      <InstructionListItem
        key={index}
        emoji={step.emoji}
        text={step.text}
        divider={index < Instructions.length - 1}
      />
    ))}
  </List>
);

export default InstructionList;
