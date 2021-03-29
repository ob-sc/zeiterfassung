import React, { useContext } from 'react';
import { useImmer } from 'use-immer';

const context = React.createContext();
const useHomeContext = () => useContext(context);

export const HomeContextProvider = ({ children }) => {
  const initialState = {
    selected: null,
    checkAll: false,
    angemeldet: false,
  };

  const [state, updateState] = useImmer(initialState);

  const updateSelected = (ah) => {
    updateState((draft) => {
      draft.selected = ah;
      draft.angemeldet = ah?.anmeldung?.start !== undefined;
    });
  };

  const updateCheckAll = (value) => {
    updateState((draft) => {
      draft.checkAll = value;
    });
  };

  const updateAngemeldet = (val) => {
    updateState((draft) => {
      draft.angemeldet = val;
    });
  };

  const contextValue = {
    state,
    updateSelected,
    updateCheckAll,
    updateAngemeldet,
  };

  return <context.Provider value={contextValue}>{children}</context.Provider>;
};

export default useHomeContext;
