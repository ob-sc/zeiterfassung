import React, { useContext, useState } from 'react';

const context = React.createContext();
const useToastContext = () => useContext(context);

export const ToastContextProvider = ({ children }) => {
  const initialState = {
    message: null,
    severity: 'info',
  };

  const [toast, setToast] = useState(initialState);

  const addError = (err) => {
    console.dir(err.message);
    setToast({
      message: err.message,
      severity: 'error',
    });
  };

  const addMessage = (msg, sev) => {
    setToast({
      message: msg,
      severity: sev,
    });
  };

  const removeToast = (toast) => {
    setToast({
      message: initialState.message,
      severity: initialState.severity,
    });
  };

  const contextValue = { toast, addError, addMessage, removeToast };

  return <context.Provider value={contextValue}>{children}</context.Provider>;
};

export default useToastContext;
