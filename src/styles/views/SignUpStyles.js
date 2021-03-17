import { makeStyles } from '@material-ui/core/styles';
import { common } from '../common';

const styles = (theme) => ({
  ...common,
  root: { width: 'min(700px, 90%)' },
  headLine: {
    textAlign: 'center',
    marginBottom: theme.spacing(3),
  },
});

const useStyles = makeStyles(styles);

export default useStyles;
