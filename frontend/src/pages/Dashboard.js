import { useEffect, useState } from "react";
import DashboardSquare from "../components/DashboardSquare";
import BoxPlot from "../components/BoxPlot";

const Dashboard = () => {
  const [revenueDetails, setRevenueDetails] = useState(null);
  const [totalStudents, setTotalStudents] = useState(null);
  const [staffCoreHours, setStaffCoreHours] = useState(null);
  const [staffEarlyMorning, setStaffEarlyMorning] = useState(null);
  const [staffExtendedDay, setStaffExtendedDay] = useState(null);
  const [staffLateDay, setStaffLateDay] = useState(null);
  const [boxPlotData, setBoxPlotData] = useState(null);

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
    //json to get is json.classRevenue
    return json;
  };

  const getStaffCoreHours = async () => {
    const coreStaff = await fetch("api/school/staff-required", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const json = await coreStaff.json();
    return json;
  };

  const getStaffProgram = async (program) => {
    const programStaff = await fetch(`api/school/staff-required/${program}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const json = await programStaff.json();
    return json;
  };

  const getBoxPlotData = async () => {
    const plotData = await fetch("/api/school/box-plot-data", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const json = await plotData.json();
    return json;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          revenueData,
          studentData,
          staffCoreData,
          staffEarlyMorningData,
          extendedDayStaff,
          lateDayStaff,
          boxPlotDatas,
        ] = await Promise.all([
          getClassRevenue(),
          getTotalStudents(),
          getStaffCoreHours(),
          getStaffProgram("earlyMorning"),
          getStaffProgram("extendedDay"),
          getStaffProgram("lateDay"),
          getBoxPlotData(),
        ]);
        setRevenueDetails(revenueData);
        setTotalStudents(studentData);
        setStaffCoreHours(staffCoreData);
        setStaffEarlyMorning(staffEarlyMorningData);
        setStaffExtendedDay(extendedDayStaff);
        setStaffLateDay(lateDayStaff);
        setBoxPlotData(boxPlotDatas);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
    };
    fetchData();
  }, []);

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
      {staffCoreHours ? (
        <DashboardSquare squareDetails={staffCoreHours} />
      ) : (
        "Loading..."
      )}
      {staffEarlyMorning ? (
        <DashboardSquare squareDetails={staffEarlyMorning} />
      ) : (
        "Loading..."
      )}
      {staffExtendedDay ? (
        <DashboardSquare squareDetails={staffExtendedDay} />
      ) : (
        "Loading..."
      )}
      {staffLateDay ? (
        <DashboardSquare squareDetails={staffLateDay} />
      ) : (
        "Loading..."
      )}
      {boxPlotData ? (
        <BoxPlot data={boxPlotData} width={700} height={400}></BoxPlot>
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default Dashboard;
