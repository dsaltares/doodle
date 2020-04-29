import React, { FunctionComponent } from 'react';

type Props = {
  symbol: string,
  label?: string,
  className?: string,
}

const Emoji: FunctionComponent<Props> = ({
  symbol,
  label,
  className,
}) => (
  <span
    className={className}
    role="img"
    aria-label={label}
    aria-hidden={label ? 'false' : 'true'}
  >
    {symbol}
  </span>
);

export default Emoji;
