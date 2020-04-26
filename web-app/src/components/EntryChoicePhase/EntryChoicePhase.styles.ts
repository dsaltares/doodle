import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    maxWidth: 500,
  },
  entryPaper: {
    maxWidth: 500,
  },
  selectedEntry: {
    borderWidth: 4,
    borderColor: theme.palette.primary.main,
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
