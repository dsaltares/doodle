import React, {
  FunctionComponent,
  createRef,
} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import MainContent from '../MainContent';
import Editor from '../Editor';
import Emoji from '../Emoji';

type Props = {
  message: string,
  submitted: boolean,
  onSubmit: (image: string) => void,
};

const DrawPhase: FunctionComponent<Props> = ({
  message,
  submitted,
  onSubmit,
}) => {
  const editorRef = createRef<Editor>();
  const handleSubmitClicked = () => {
    const editor = editorRef.current;
    if (editor) {
      const image = editor.export();
      onSubmit(image);
    }
  };

  return (
    <MainContent width={800}>
      <Grid item xs={12}>
        <Typography>{message}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Editor ref={editorRef}/>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmitClicked}
          disabled={submitted}
        >
          <Emoji symbol="🎨"/>
          <span>Done</span>
        </Button>
      </Grid>
    </MainContent>
  );
};

export default DrawPhase;
