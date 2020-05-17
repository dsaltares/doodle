import { makeStyles } from '@material-ui/core/styles';

type PaperProps = {
  width: number;
};

type PaperStyle = {
  padding: number;
  maxWidth: number;
};

const useStyles = makeStyles((theme) => ({
  paper: (props: PaperProps): PaperStyle => ({
    padding: theme.spacing(3),
    maxWidth: props.width,
  }),
}));

export default useStyles;
