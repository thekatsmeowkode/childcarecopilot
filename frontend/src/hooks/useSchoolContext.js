import { SchoolContext } from "../context/SchoolContext";
import { useContext } from "react";

export const useSchoolContext = () => {
    const context = useContext(SchoolContext)

    if (!context) {
        throw Error('Use school context must be in a classroom provider')
    }

    return context
}