import { AccountContextType, initialState } from "@/Interfaces";
import { createContext, useContext, useState } from "react";

export const MyGlobalContext = createContext<{
  state: AccountContextType;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

