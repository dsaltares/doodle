import React, { useEffect, FunctionComponent } from 'react';

import Editor from '../Editor';

type Props = {
  connect: () => void,
}

const Game: FunctionComponent<Props> = ({
  connect,
}) => {
  useEffect(() => {
    connect();
  });

return (
    <React.Fragment>

      <Editor />
    </React.Fragment>
  );
};

export default Game;
