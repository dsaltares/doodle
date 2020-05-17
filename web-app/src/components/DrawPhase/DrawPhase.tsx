import React, { FunctionComponent, createRef } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import MainContent from '../MainContent';
import Editor from '../Editor';
import Emoji from '../Emoji';

type Props = {
  firstCreateTurn: boolean;
  submitted: boolean;
  concept: string | undefined;
  conceptFrom: string | undefined;
  onSubmit: (image: string) => void;
};

const DrawPhase: FunctionComponent<Props> = ({
  firstCreateTurn,
  submitted,
  concept,
  conceptFrom,
  onSubmit,
}) => {
  const editorRef = createRef<Editor>();
  const handleSubmitClicked = (): void => {
    const editor = editorRef.current;
    if (editor) {
      const image = editor.export();
      onSubmit(image);
    }
  };

  const emoji = submitted ? '⏳' : '✏️';
  let message = '';
  if (submitted) {
    message = 'Waiting for everyone to finish their drawing.';
  } else if (firstCreateTurn) {
    message = `Draw "${concept}".`;
  } else {
    message = `From ${conceptFrom}, draw "${concept}".`;
  }

  return (
    <MainContent width={800}>
      <Grid item xs={12}>
        <Typography>
          <Emoji symbol={emoji} />
          <span> {message}</span>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Editor ref={editorRef} />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmitClicked}
          disabled={submitted}
        >
          <Emoji symbol="🎨" />
          <span>Done</span>
        </Button>
      </Grid>
    </MainContent>
  );
};

export default DrawPhase;
