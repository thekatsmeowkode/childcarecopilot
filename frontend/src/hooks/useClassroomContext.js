import { ClassroomContext } from "../context/ClassroomContext";
import { useContext } from "react";

export const useClassroomContext = () => {
    const context = useContext(ClassroomContext)

    if (!context) {
        throw Error('useClassroomContext must be used inside a ClassroomContextProvider')
    }

    return context
}