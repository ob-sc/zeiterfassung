import { Box, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import useToastContext from '../context/ToastContext';

function Toast({ mobile }) {
  const { toast, removeToast } = useToastContext();

  const handleClose = (event, reason) => {
    // bei klick außerhalb soll toast bleiben
    if (reason === 'clickaway') return;
    // bei autohide oder klick auf x
    removeToast();
  };

  return (
    // bool toast.message = false verhindert fade out
    // vor dem fade out wird toast auf null zurückgesetzt
    // dann braucht die severity einen default und ändert kurz die farbe
    !!toast.message && (
      <Box textAlign="center">
        <Snackbar
          anchorOrigin={{
            vertical: mobile ? 'bottom' : 'top',
            horizontal: 'center',
          }}
          open={!!toast.message}
          autoHideDuration={5000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={toast.severity}>
            {toast.message}
          </Alert>
        </Snackbar>
      </Box>
    )
  );
}

export default Toast;
