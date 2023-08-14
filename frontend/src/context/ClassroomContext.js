import { createContext, useReducer } from "react";

export const ClassroomContext = createContext();

export const classroomReducer = (state, action) => {
  switch (action.type) {
    case "SET_CLASSROOMS":
      console.log(state)
      return { classrooms: action.payload };
    case "CREATE_CLASSROOM":
      return { classrooms: [action.payload, ...state.classrooms] };
    case "DELETE_CLASSROOM":
      return {
        classrooms: state.classrooms.filter(
          (classroom) => classroom._id !== action.payload._id
        ),
      };
    case "DELETE_STUDENT":
      return { classrooms: action.payload };
    case "UPDATE_STUDENTS":
      // console.log({"1":action.payload})
      //action.payload = {roomName: 'infants', students: []}
      // console.log({"2":state.classrooms})
      //state.classrooms = [{},{}]
      const newState = state.classrooms.map((classroom) =>
        classroom.roomName === action.payload.roomName
          ? {
              ...classroom,
              students: [...action.payload.students],
            }
          : classroom
      );
      // console.log({"3":newState})
      return {
        classrooms: newState,
      };
    default:
      return state;
  }
};

export const ClassroomContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(classroomReducer, { classrooms: null });

  return (
    <ClassroomContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ClassroomContext.Provider>
  );
};
