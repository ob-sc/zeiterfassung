import { makeStyles } from '@material-ui/core/styles';
import { colors } from './theme';

export const layout = {
  fw: {
    width: '100%',
  },
  centerTransform: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  flexColumnCenter: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexColumnCenterStart: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  flexRowCenter: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexRowCenterStartWrap: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  flexRowAroundStartWrap: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
};

// todo muss eig unten zu (theme) =>
// dann theme.palette.primary.main und .light?
export const buttons = {
  button: {
    color: colors.black,
    '&:disabled': {
      color: colors.grey,
    },
  },
  iconButton: {
    '& svg': {
      fontSize: 33,
    },
  },
};

const useCommonStyles = makeStyles((theme) => ({
  ...layout,
  ...buttons,
  smItem: { width: 'min(250px, 60vw)' },
  mdItem: { width: 'min(300px, 80vw)' },
  lgItem: { width: 'min(350px, 90vw)' },
  xsContainer: {
    width: 'min(350px, 50vw)',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  smContainer: {
    width: 600,
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.down('xs')]: {
      width: '50vw',
    },
  },
  mdContainer: {
    width: 800,
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '80vw',
    },
  },
  lgContainer: {
    width: 980,
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.down('md')]: {
      width: '80vw',
    },
    [theme.breakpoints.down('xs')]: {
      width: '90vw',
    },
  },
  xlContainer: {
    width: 1200,
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.down('md')]: {
      width: '80vw',
    },
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
