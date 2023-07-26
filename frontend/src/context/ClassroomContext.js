import { createContext, useReducer } from "react";

export const ClassroomContext = createContext();

export const classroomReducer = (state, action) => {
  switch (action.type) {
    case "SET_CLASSROOMS":
      return { classrooms: action.payload };
    //adds new class to the classrooms array in context state
    case "CREATE_CLASSROOM":
      return { classrooms: [action.payload, ...state.classrooms] };
    case "DELETE_CLASSROOM":
      return {
        classrooms: state.classrooms.filter(
          (classroom) => classroom._id !== action.payload._id
        ),
      };
    // case "UPDATE_CLASSROOM_NAME":
    //   return {
    //     classrooms: state.classrooms.map((classroom) =>
    //       classroom._id === action.payload._id
    //         ? { ...classroom, roomName: action.payload.roomName }
    //         : classroom
    //     ),
    //   };
    // case "UPDATE_STUDENT":
    //   //input is one student {student}
    //   const targetClassroom = state.classrooms.find(
    //     (oneClassroom) => oneClassroom.roomName === action.payload.classroomName
    //   );
    //   const newClassState = targetClassroom.students.map((student) =>
    //     student.id === action.payload.id ? { ...action.payload } : student
    //   );
    //   const newStateClassrooms = state.classrooms.map((classroom) =>
    //     classroom.roomName === targetClassroom.roomName
    //       ? {
    //           ...classroom,
    //           students: [...newClassState],
    //         }
    //       : classroom
    //   );
    //   return {
    //     classrooms: newStateClassrooms,
    //   };

    case "UPDATE_STUDENT":
      console.log(action.payload)
      const { id, classroomName, ...updatedData } = action.payload;

      // Update the student details in the client-side state
      const updatedClassrooms = state.classrooms.map((classroom) =>
        classroom.roomName === classroomName
          ? {
              ...classroom,
              students: classroom.students.map((student) =>
                student.id === id ? { ...student, ...updatedData } : student
              ),
            }
          : classroom
      );
      console.log(updatedClassrooms)
      return {
        classrooms: updatedClassrooms
      };

    case "ADD_STUDENT_TO_CLASSROOM":
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
