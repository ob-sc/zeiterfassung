import React, { useContext } from 'react';
import { useImmer } from 'use-immer';

const context = React.createContext();
const useHomeContext = () => useContext(context);

export const HomeContextProvider = ({ children }) => {
  // selected = {data: {id: ?, ...}, anmeldung: {start: ?, ...}}
  const initialState = {
    selected: null,
    checkAll: false,
    angemeldet: false,
    max: null,
  };

  const [state, updateState] = useImmer(initialState);

  const updateSelected = (ah) => {
    updateState((draft) => {
      draft.selected = ah;
      draft.angemeldet = ah?.anmeldung?.start !== undefined;
      if (ah === null) draft.max = null;
    });
  };

  const updateCheckAll = (val) => {
    updateState((draft) => {
      draft.checkAll = val;
    });
  };

  const updateAngemeldet = (val) => {
    updateState((draft) => {
      draft.angemeldet = val;
    });
  };

  const updateMax = (val) => {
    updateState((draft) => {
      draft.max = val;
    });
  };

  const contextValue = {
    state,
    updateSelected,
    updateCheckAll,
    updateAngemeldet,
    updateMax,
  };

  return <context.Provider value={contextValue}>{children}</context.Provider>;
};

export default useHomeContext;
