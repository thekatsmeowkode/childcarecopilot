import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

export const useSchoolContext = () => {
    const context = useContext(ThemeContext)

    if (!context) {
        throw Error('Use theme context must be in a theme provider')
    }

    return context
}