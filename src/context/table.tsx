import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

import { IStateContext } from '../utils/types';

interface AppProviderProps {
  children?: ReactNode;
}

export interface StateWrapper {
  state: IStateContext;
  setState: Dispatch<SetStateAction<IStateContext>>;
}

export const AppStateContext = createContext<StateWrapper>({} as StateWrapper);

const TabsProvider = (props: AppProviderProps) => {
  const [state, setState] = useState({});

  return (
    <AppStateContext.Provider value={{ state, setState }}>
      {props.children}
    </AppStateContext.Provider>
  );
};
export const useTableContext = () => useContext(AppStateContext);

export default TabsProvider;
