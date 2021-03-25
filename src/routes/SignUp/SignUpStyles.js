import { makeStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  center: {
    textAlign: 'center',
    marginBottom: theme.spacing(3),
  },
});

const useStyles = makeStyles(styles);

export default useStyles;
