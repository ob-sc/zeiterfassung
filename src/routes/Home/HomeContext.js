import React, { useContext } from 'react';
import { useImmer } from 'use-immer';

const context = React.createContext();
const useHomeContext = () => useContext(context);

export const HomeContextProvider = ({ children }) => {
  const initialState = {
    selected: null,
  };

  const [state, updateState] = useImmer(initialState);

  function updateSelected(ah) {
    updateState((draft) => {
      draft.selected = ah;
    });
  }

  const contextValue = {
    state,
    updateSelected,
  };

  return <context.Provider value={contextValue}>{children}</context.Provider>;
};

export default useHomeContext;
