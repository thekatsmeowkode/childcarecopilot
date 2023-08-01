import { useEffect, useState } from "react";
import DashboardSquare from "../components/DashboardSquare";

const Dashboard = () => {
  const [revenueDetails, setRevenueDetails] = useState(null);
  const [totalStudents, setTotalStudents] = useState(null);

  const CLASSROOM_NAMES = {
    infants: "infants",
    toddlers: "toddlers",
    crawlers: "crawlers",
    twos: "twos",
  };

  const getClassRevenue = async () => {
    const classRevenue = await fetch("api/school/class-revenue", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const json = await classRevenue.json();
    //json to get is json.classRevenue
    return json;
  };

  const getTotalStudents = async () => {
    const totalStudents = await fetch("api/school/total-students", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const json = await totalStudents.json();
    console.log(json)
    //json to get is json.classRevenue
    return json;
  };

  const getStudentAges = async () => {

  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [revenueData, studentData] = await Promise.all([
          getClassRevenue(),
          getTotalStudents(),
        ]);
        setRevenueDetails(revenueData);
        setTotalStudents(studentData);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
    };
      fetchData()
    }, [])


  return (
    <>
      {revenueDetails ? (
        <DashboardSquare squareDetails={revenueDetails} />
      ) : (
        "Loading..."
      )}
      {totalStudents ? (
        <DashboardSquare squareDetails={totalStudents} />
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default Dashboard;
