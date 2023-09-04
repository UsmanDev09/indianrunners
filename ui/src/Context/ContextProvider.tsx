import { MyGlobalContext } from "@/Hooks/useGlobalContext";
import { AccountContextType, initialState } from "@/Interfaces";
import { accountReducer } from "@/Reducers/reducers";
import { PropsWithChildren, createContext, useReducer, useState } from "react";

export const ContextProvider = (props: PropsWithChildren) => {
  const [name, setName] = useState<string>("system");
  const [state, dispatch] = useReducer(accountReducer, initialState);
  return (
    <MyGlobalContext.Provider value={{ state, dispatch }}>
      {props.children}
    </MyGlobalContext.Provider>
  );
};
