import { AccountContextType, initialState } from "@/Interfaces";
import { createContext, useContext, useState } from "react";

export const MyGlobalContext = createContext<{
  state: AccountContextType;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

// const useGlobalContext = (): AccountContextType => {
//   // 2. use the useContext hook
//   const context = useContext(MyGlobalContext);

//   // 3. Make sure it's not null!
//   if (!context) {
//     throw new Error("Please use ContextProvider in parent component");
//   }

//   return context;
// };

// export default useGlobalContext;
