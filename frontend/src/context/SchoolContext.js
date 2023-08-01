import { createContext, useReducer } from "react";

export const SchoolContext = createContext();

    export const schoolReducer = (state, action) => {
        switch (action.type) {
            case "SET_SCHOOL":
                return {school:action.payload}
            default:
                return state
        }
    }

export const SchoolContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(schoolReducer, {school:null})

    return (
        <SchoolContextProvider value={{...state, dispatch}}>
            {children}
        </SchoolContextProvider>
    )
}