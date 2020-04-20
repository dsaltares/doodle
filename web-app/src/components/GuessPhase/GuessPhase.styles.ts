import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
  },
  image: {
    width: 400,
    borderRadius: 4,
  }
}));

export default useStyles;
