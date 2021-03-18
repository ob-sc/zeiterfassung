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

export const common = {
  ...flex,
  input: {
    width: 300,
  },
};

const useCommonStyles = makeStyles(common);

export default useCommonStyles;

/*
 * dürfen nicht root oder anderen
 * Namen aus jss haben, sonst geht
 * style = { ...common, root: {  }}
 * nicht mehr
 */
