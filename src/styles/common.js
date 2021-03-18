import { makeStyles } from '@material-ui/core/styles';

const flex = {
  flexCenterRoot: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export const util = {
  ...flex,
};

const useCommonStyles = makeStyles((theme) => ({
  ...util,
  mdInput: {
    width: 300,
    [theme.breakpoints.down('xs')]: {
      width: '70vw',
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
