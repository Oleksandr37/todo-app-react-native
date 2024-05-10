import React, { createContext } from "react";
import { UserStoreType } from "../types/UserStoreType";
import { UserStore } from "../stores/UserStore";

type UseStoreType = {
    userStore: UserStoreType;
}

const StoreContext = createContext<UseStoreType>({} as UseStoreType);
type Props = {children: React.ReactNode}

export const StoreProvider = ({children} : Props) => {
    const userStore = new UserStore();
    return <StoreContext.Provider value={{userStore}}>{children}</StoreContext.Provider>
}
export const useStore = () => React.useContext(StoreContext);