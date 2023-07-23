import { createContext, useReducer } from 'react'

export const ClassroomContext = createContext()

export const classroomReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CLASSROOMS':
            return {classrooms: action.payload}
        case 'CREATE_CLASSROOM':
            return {classrooms: [action.payload, ...state.classrooms]}
        case 'DELETE_CLASSROOM':
            return {
                classrooms: state.classrooms.filter((classroom) => 
                    classroom._id !== action.payload._id
                )
            }
        default:
            return state
    }
}

export const ClassroomContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(classroomReducer, {classrooms:null})

    return (
        <ClassroomContext.Provider value={{...state, dispatch}}>
          { children }
        </ClassroomContext.Provider>
    )
}