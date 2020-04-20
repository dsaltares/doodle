import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    maxWidth: 500,
  },
  choicesContainer: {
    padding: theme.spacing(3),
    maxWidth: 500,
  },
  img: {
    width: '100%',
  },
}));

export default useStyles;
