import { makeStyles } from '@material-ui/core/styles';
import { colors } from './theme';

const layout = {
  centerTransform: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  flexRowCenter: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
};

// todo muss eig unten zu (theme) =>
// dann theme.palette.primary.main und .light?
const buttons = {
  button: {
    color: colors.black,
    '&:disabled': {
      color: colors.grey,
    },
  },
  iconButton: {
    '& svg': {
      fontSize: 35,
    },
  },
};

export const commonClasses = {
  ...layout,
  ...buttons,
};

const useCommonStyles = makeStyles((theme) => ({
  ...commonClasses,
  mdItem: {
    width: 300,
    [theme.breakpoints.down('xs')]: {
      width: '60vw',
    },
  },
  smContainer: {
    width: 420,
    [theme.breakpoints.down('xs')]: {
      width: '50vw',
    },
  },
  mdContainer: {
    width: 600,
    [theme.breakpoints.down('xs')]: {
      width: '70vw',
    },
  },
  lgContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 980,
    [theme.breakpoints.down('md')]: {
      width: '70vw',
    },
    [theme.breakpoints.down('xs')]: {
      width: '80vw',
    },
  },
  xlContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 1200,
    [theme.breakpoints.down('xs')]: {
      width: '90vw',
    },
  },
}));

export default useCommonStyles;

/*
 *           ACHTUNG
 * Klassen dürfen nicht root oder
 * Namen aus jss haben, sonst geht
 * style = { ...common, root: {  }}
 * oder alles nicht mehr
 */
