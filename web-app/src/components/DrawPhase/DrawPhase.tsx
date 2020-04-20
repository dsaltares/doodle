import React, {
  FunctionComponent,
  createRef,
} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import useStyles from './DrawPhase.styles';
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
  const classes = useStyles();
  const editorRef = createRef<Editor>();
  const handleSubmitClicked = () => {
    const editor = editorRef.current;
    if (editor) {
      const image = editor.export();
      onSubmit(image);
    }
  };

  return (
    <Grid item xs={10}>
      <Paper elevation={1} variant="outlined" className={classes.paper}>
        <Grid container direction="column" spacing={2}>
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
        </Grid>
      </Paper>
    </Grid>
  );
};

export default DrawPhase;
