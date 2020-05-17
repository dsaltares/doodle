import { makeStyles } from '@material-ui/core/styles';

type PaperProps = {
  width: number;
};

const useStyles = makeStyles((theme) => ({
  paper: (props: PaperProps) => ({
    padding: theme.spacing(3),
    maxWidth: props.width,
  }),
}));

export default useStyles;
