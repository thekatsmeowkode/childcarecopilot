import { useEffect } from "react";
import { useClassroomContext } from "../hooks/useClassroomContext";

//components
import ClassroomDetails from "../components/ClassroomDetails";
import ClassForm from "../components/ClassForm";
import StudentForm from "../components/StudentForm";

const Home = () => {
  const { classrooms, dispatch } = useClassroomContext();

  useEffect(() => {
    const fetchClass = async () => {
      //in production this needs to be changed to correct endpoint
      const response = await fetch("/api/classes");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_CLASSROOMS", payload: json });
      }
    };

    fetchClass();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="classrooms">
        {classrooms &&
          classrooms.map((classroom) => (
            <ClassroomDetails key={classroom._id} classroom={classroom} />
          ))}
      </div>
      <div className="students">

      </div>
      <ClassForm></ClassForm>
      <StudentForm></StudentForm>
    </div>
  );
};

export default Home;
