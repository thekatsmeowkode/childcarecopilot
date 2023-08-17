import React, { useEffect, useState } from "react";
import BoxPlot from "../components/dashboardSquares/BoxPlot";
import DoughnutChart from "../components/dashboardSquares/DoughnutChart";
import CapacitySquare from "../components/dashboardSquares/CapacitySquare";
import Histogram from "../components/dashboardSquares/Histogram";
import LoadingSpinner from "../components/dashboardSquares/LoadingSpinner";
import { formatDate } from "../utils/formatDates";
import "../css/dashboard.css";
import { fetchData } from "../hooks/useApi";
import TeacherRequiredSquare from "../components/dashboardSquares/TeacherRequiredSquare";

const Dashboard = React.memo(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [revenueDetails, setRevenueDetails] = useState(null);
  const [staffCoreHours, setStaffCoreHours] = useState(null);
  const [staffEarlyMorning, setStaffEarlyMorning] = useState(null);
  const [staffExtendedDay, setStaffExtendedDay] = useState(null);
  const [staffLateDay, setStaffLateDay] = useState(null);
  const [boxPlotData, setBoxPlotData] = useState(null);
  const [roomCapacities, setRoomCapacities] = useState(null);
  const [histogramData, setHistogramData] = useState(null);
  const [foodData, setFoodData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));

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
    return await fetchData("api/school/box-plot-data", "GET");
  };

  const getRoomCapacities = async () => {
    return await fetchData("api/school/school-capacity", "GET");
  };

  const getHistogramData = async (date) => {
    const histogramDate = date ? date : formatDate(new Date());

    return await fetchData(
      `api/waitlist/histogram/data/${histogramDate}`,
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
    return await fetchData(`api/school/get-food-requirements`, "GET");
  };

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
          foodData,
        ] = await Promise.all([
          getClassRevenue(),
          getStaffCoreHours(),
          getStaffProgram("earlyMorning"),
          getStaffProgram("extendedDay"),
          getStaffProgram("lateDay"),
          getBoxPlotData(),
          getRoomCapacities(),
          getHistogramData(),
          getFoodData(),
        ]);
        setRevenueDetails(revenueData);
        setStaffCoreHours(staffCoreData);
        setStaffEarlyMorning(staffEarlyMorningData);
        setStaffExtendedDay(extendedDayStaff);
        setStaffLateDay(lateDayStaff);
        setBoxPlotData(boxPlotDatas);
        setRoomCapacities(roomCapacityData);
        setHistogramData(histogramData);
        setFoodData(foodData);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
    };
    fetchData();
    setIsLoading(false)
  }, []);

  return (
    <div className="dashboard-container">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="first-row">
            <div className="histogram-container">
              <div className="histogram-input">
                <h3>Students</h3>
                {histogramData ? (
                  <input
                    type="date"
                    min={formatDate(new Date())}
                    value={selectedDate}
                    onChange={onDateChange}
                  />
                ) : null}
              </div>
              {histogramData &&
                (histogramData,
                (
                  <Histogram
                    width={600}
                    height={400}
                    data={histogramData}
                    className="histogram"
                  />
                ))}
            </div>
            <div className="staff-needs-table">
              <h3>Staffing Requirements</h3>
              {staffLateDay &&
                staffExtendedDay &&
                staffEarlyMorning &&
                staffCoreHours && (
                  <TeacherRequiredSquare
                    className="teacher-required-square"
                    staffLateData={staffLateDay}
                    staffEarlyData={staffEarlyMorning}
                    staffExtendedData={staffExtendedDay}
                    staffCoreData={staffCoreHours}
                    revenueData={revenueDetails}
                    roomCapacityData={roomCapacities.numStudentsPerClass}
                  />
                )}
            </div>
          </div>
          <div className="second-row">
            <div className="capacity-container">
              <h3>Current Enrollment</h3>
              {roomCapacities && (
                <CapacitySquare
                  className="capacity-square"
                  roomCapacities={roomCapacities.roomCapacities}
                  currentStudentsByClass={roomCapacities.numStudentsPerClass}
                />
              )}
            </div>
            <div className="doughnut-box">
              <h3>Food Requirements Per Day</h3>
              <div className="doughnut-chart">
                {foodData && (
                  <DoughnutChart className="doughnut" foodData={foodData} />
                )}
              </div>
              <p>Amounts based on 2 snacks per day for 1-3 year olds</p>
            </div>
            {boxPlotData &&
              (boxPlotData,
              (
                <BoxPlot
                  className="boxplot"
                  data={boxPlotData}
                  width={500}
                  height={400}
                ></BoxPlot>
              ))}
          </div>
        </>
      )}
    </div>
  );
});

export default Dashboard;
