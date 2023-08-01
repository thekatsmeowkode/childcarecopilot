import { useState } from "react";
import DashboardSquare from "../components/DashboardSquare";

const Dashboard = () => {
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
    console.log(json);
  };

  return (
    <>
    <button onClick={getClassRevenue}>Click</button>
      <DashboardSquare getClassRevenue={getClassRevenue} />
    </>
  );
};

export default Dashboard;
