import PropTypes from 'prop-types';
import { Box, useTheme } from '@material-ui/core';
import useCommonStyles from '../styles/common';

function BorderContainer({ size, children, ...rest }) {
  const { smContainer, mdContainer, lgContainer } = useCommonStyles();
  const theme = useTheme();

  let containerSize = '';

  if (size !== undefined)
    switch (size) {
      case 'sm':
        containerSize = smContainer;
        break;
      case 'md':
        containerSize = mdContainer;
        break;
      case 'lg':
        containerSize = lgContainer;
        break;
      default:
        containerSize = null;
        break;
    }

  return (
    <Box
      {...rest}
      border={1}
      borderColor={theme.palette.primary.light}
      borderRadius={5}
      className={containerSize !== null && containerSize}
      clone
    >
      {children}
    </Box>
  );
}

BorderContainer.propTypes = { size: PropTypes.string };

export default BorderContainer;
