import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
  avatar: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    width: theme.spacing(8),
    height: theme.spacing(8),
    marginRight: theme.spacing(2),
  },
}));

export default useStyles;
