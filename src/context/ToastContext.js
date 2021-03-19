import React, { useContext } from 'react';
import { useImmer } from 'use-immer';

const context = React.createContext();
const useToastContext = () => useContext(context);

export const ToastContextProvider = ({ children }) => {
  const initialState = {
    message: null,
    severity: 'info',
  };

  const [toast, updateToast] = useImmer(initialState);

  const addError = (err) => {
    updateToast((draft) => {
      draft.message = err.message;
      draft.severity = 'error';
    });
  };

  const addMessage = (msg, sev) => {
    updateToast((draft) => {
      draft.message = msg;
      draft.severity = sev;
    });
  };

  const removeToast = (toast) => {
    updateToast((draft) => {
      draft.message = initialState.message;
      draft.severity = initialState.severity;
    });
  };

  const contextValue = { toast, addError, addMessage, removeToast };

  return <context.Provider value={contextValue}>{children}</context.Provider>;
};

export default useToastContext;
