import { makeStyles } from '@material-ui/core/styles';

export const common = {
  input: {
    width: 'min(300px, 75vw)',
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
