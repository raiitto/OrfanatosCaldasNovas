import React, {createContext, useContext,  useState} from "react";

interface DashboardContextData {
    mainPage: boolean;
    setMainPage(mainPage: boolean): void
}

const DashboardContext = createContext<DashboardContextData>({} as DashboardContextData);

export const DashboardProvider: React.FC = ({children}) => {
    const [ mainPage, setMainPage ] = useState(true);
    return (
        <DashboardContext.Provider value={{mainPage, setMainPage}}>
            {children}
        </DashboardContext.Provider>
    )
}


export function useDashboardContext(){
    return useContext(DashboardContext);
}