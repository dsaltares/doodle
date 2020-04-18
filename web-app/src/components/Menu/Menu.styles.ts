import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
  },
  buttonGroup: {
    flex: 1,
  },
  button: {
    flex: 1,
  }
}));

export default useStyles;
