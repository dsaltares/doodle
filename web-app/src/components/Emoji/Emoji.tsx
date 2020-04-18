import React, { FunctionComponent } from 'react';

type Props = {
  symbol: string,
  label?: string,
}

const Emoji: FunctionComponent<Props> = ({
  symbol,
  label,
}) => (
  <span
    role="img"
    aria-label={label}
    aria-hidden={label ? 'false' : 'true'}
  >
    {symbol}
  </span>
);

export default Emoji;
