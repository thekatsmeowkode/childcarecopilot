import { createContext, useReducer } from "react";

export const ClassroomContext = createContext();

export const classroomReducer = (state, action) => {
  switch (action.type) {
    case "SET_CLASSROOMS":
      return { classrooms: action.payload };
    case "CREATE_CLASSROOM":
      return { classrooms: [action.payload, ...state.classrooms] };
    case "DELETE_CLASSROOM":
      return {
        classrooms: state.classrooms.filter(
          (classroom) => classroom._id !== action.payload._id
        ),
      };
    case "UPDATE_CLASSROOM_NAME":
      return {
        classrooms: state.classrooms.map((classroom) =>
          classroom._id === action.payload._id
            ? { ...classroom, roomName: action.payload.roomName }
            : classroom
        ),
      };
    case "ADD_STUDENT_TO_CLASSROOM":
      return {
        classrooms: state.classrooms.map((classroom) =>
          classroom._id === action.payload.classroomId
            ? {
                ...classroom,
                students: [...classroom.students, action.payload.newStudent],
              }
            : classroom
        ),
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
