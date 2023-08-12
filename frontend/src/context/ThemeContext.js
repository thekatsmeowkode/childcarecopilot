import { createContext, useReducer } from "react";

export const ThemeContext = createContext();

    export const themeReducer = (state, action) => {
        switch (action.type) {
            case "SET_SCHOOL":
                return {school:action.payload}
            default:
                return state
        }
    }

export const ThemeContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(themeReducer, {theme:null})

    return (
        <ThemeContextProvider value={{...state, dispatch}}>
            {children}
        </ThemeContextProvider>
    )
}