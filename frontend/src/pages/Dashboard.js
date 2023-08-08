import { useEffect, useState } from "react";
import BoxPlot from "../components/dashboardSquares/BoxPlot";
import RevenueSquare from "../components/dashboardSquares/RevenueSquare";
import CoreHoursSquare from "../components/dashboardSquares/CoreHoursSquare";
import CapacitySquare from "../components/dashboardSquares/CapacitySquare";
import ProgramSquare from "../components/dashboardSquares/ProgramSquare";
import Spinner from "react-bootstrap/Spinner";
import "../css/dashboard.css";

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
    return json;
  };

  const getTotalStudents = async () => {
    const totalStudents = await fetch("api/school/total-students", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const json = await totalStudents.json();
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
      <main class="dashboard-grid">
        {revenueDetails ? (
          <RevenueSquare revenueData={revenueDetails} />
        ) : (
          <Spinner animation="grow" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {totalStudents ? (
          <CapacitySquare capacityData={totalStudents} />
        ) : (
          <Spinner animation="grow" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {staffCoreHours ? (
          <CoreHoursSquare coreData={staffCoreHours} />
        ) : (
          <Spinner animation="grow" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {staffEarlyMorning ? (
          <ProgramSquare programData={staffEarlyMorning} />
        ) : (
          <Spinner animation="grow" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {staffExtendedDay ? (
          <ProgramSquare programData={staffExtendedDay} />
        ) : (
          <Spinner animation="grow" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {staffLateDay ? (
          <ProgramSquare programData={staffLateDay} />
        ) : (
          <Spinner animation="grow" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {boxPlotData ? (
          <BoxPlot
            className="boxplot"
            data={boxPlotData}
            width={700}
            height={400}
          ></BoxPlot>
        ) : null}
      </main>
    </>
  );
};

export default Dashboard;
