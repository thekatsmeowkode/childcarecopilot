import React, { useEffect, useState } from "react";
import BoxPlot from "../components/dashboardSquares/BoxPlot";
import RevenueSquare from "../components/dashboardSquares/RevenueSquare";
import CoreHoursSquare from "../components/dashboardSquares/CoreHoursSquare";
import CapacitySquare from "../components/dashboardSquares/CapacitySquare";
import ProgramSquare from "../components/dashboardSquares/ProgramSquare";
import Histogram from "../components/dashboardSquares/Histogram";
import FoodSquare from '../components/dashboardSquares/FoodSquare'
import LoadingSpinner from "../components/dashboardSquares/LoadingSpinner";
import { formatDate } from "../utils/formatDates";
import "../css/dashboard.css";
import { fetchData } from "../hooks/useApi";

const Dashboard = React.memo(() => {
  const [revenueDetails, setRevenueDetails] = useState(null);
  const [staffCoreHours, setStaffCoreHours] = useState(null);
  const [staffEarlyMorning, setStaffEarlyMorning] = useState(null);
  const [staffExtendedDay, setStaffExtendedDay] = useState(null);
  const [staffLateDay, setStaffLateDay] = useState(null);
  const [boxPlotData, setBoxPlotData] = useState(null);
  const [roomCapacities, setRoomCapacities] = useState(null);
  const [histogramData, setHistogramData] = useState(null);
  const [foodData, setFoodData] = useState(null) 
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));

  const renderComponentOrSpinner = (data, Component) => {
    return data ? Component : <LoadingSpinner />;
  };

  const getClassRevenue = async () => {
    return await fetchData("api/school/class-revenue", "GET");
  };

  const getStaffCoreHours = async () => {
    return await fetchData("api/school/staff-required", "GET");
  };

  const getStaffProgram = async (program) => {
    return await fetchData(`api/school/staff-required/${program}`, "GET");
  };

  const getBoxPlotData = async () => {
    return await fetchData("/api/school/box-plot-data", "GET");
  };

  const getRoomCapacities = async () => {
    return await fetchData("api/school/school-capacity", "GET");
  };

  const getHistogramData = async (date) => {
    const histogramDate = date ? date : formatDate(new Date());

    return await fetchData(
      `/api/waitlist/histogram/data/${histogramDate}`,
      "GET"
    );
  };

  const onDateChange = async (e) => {
    const { value } = e.target;
    setSelectedDate(value);
    const newHistogramData = await getHistogramData(formatDate(value));
    setHistogramData(newHistogramData);
  };

  const getFoodData = async () => {
    return await fetchData(
      `/api/school/get-food-requirements`,
      "GET"
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          revenueData,
          staffCoreData,
          staffEarlyMorningData,
          extendedDayStaff,
          lateDayStaff,
          boxPlotDatas,
          roomCapacityData,
          histogramData,
          foodData
        ] = await Promise.all([
          getClassRevenue(),
          getStaffCoreHours(),
          getStaffProgram("earlyMorning"),
          getStaffProgram("extendedDay"),
          getStaffProgram("lateDay"),
          getBoxPlotData(),
          getRoomCapacities(),
          getHistogramData(),
          getFoodData()
        ]);
        setRevenueDetails(revenueData);
        setStaffCoreHours(staffCoreData);
        setStaffEarlyMorning(staffEarlyMorningData);
        setStaffExtendedDay(extendedDayStaff);
        setStaffLateDay(lateDayStaff);
        setBoxPlotData(boxPlotDatas);
        setRoomCapacities(roomCapacityData);
        setHistogramData(histogramData);
        setFoodData(foodData)
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="dashboard-container">
      <div className="dashboard-tables">
        {revenueDetails &&
          renderComponentOrSpinner(
            revenueDetails,
            <RevenueSquare revenueData={revenueDetails} />
          )}
        {roomCapacities &&
          renderComponentOrSpinner(
            roomCapacities,
            <CapacitySquare
              roomCapacities={roomCapacities.roomCapacities}
              currentStudentsByClass={roomCapacities.numStudentsPerClass}
            />
          )}
          {foodData&& <FoodSquare foodData={foodData}/>}
        {boxPlotData &&
          renderComponentOrSpinner(
            boxPlotData,
            <BoxPlot
              className="boxplot"
              data={boxPlotData}
              width={500}
              height={400}
            ></BoxPlot>
          )}
        <div>
          {histogramData ? (
            <input
              type="date"
              min={formatDate(new Date())}
              value={selectedDate}
              onChange={onDateChange}
            />
          ) : null}
          {histogramData &&
            renderComponentOrSpinner(
              histogramData,
              <Histogram width={600} height={400} data={histogramData} />
            )}
        </div>
      </div>
      <div className="staff-squares">
        {staffCoreHours &&
          renderComponentOrSpinner(
            staffCoreHours,
            <CoreHoursSquare coreData={staffCoreHours} />
          )}
        {staffEarlyMorning &&
          renderComponentOrSpinner(
            staffEarlyMorning,
            <ProgramSquare programData={staffEarlyMorning} />
          )}
        {staffExtendedDay &&
          renderComponentOrSpinner(
            staffExtendedDay,
            <ProgramSquare programData={staffExtendedDay} />
          )}
        {staffLateDay &&
          renderComponentOrSpinner(
            staffLateDay,
            <ProgramSquare programData={staffLateDay} />
          )}
      </div>
      </div>
    </>
  );
});

export default Dashboard;
