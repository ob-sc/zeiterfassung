import { Box, Paper, useTheme } from '@material-ui/core';

function PaperContainer({ children, ...rest }) {
  const theme = useTheme();

  return (
    <Box {...rest} border={1} borderColor={theme.palette.primary.light} clone>
      <Paper>{children}</Paper>
    </Box>
  );
}

export default PaperContainer;
