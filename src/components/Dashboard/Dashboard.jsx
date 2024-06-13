import React from 'react'
import DashboardCards from '../DashboardCards/DashboardCards'
import css from "./Dashboard.module.scss";

const Dashboard = () => {
  return (
    <div className={css.dashboardMain}>
      <div className={css.top}>
        <span>Hello, Admin!</span> <span>Here's Your Dashboard</span>
      </div>
      <DashboardCards />
    </div>
  );
}

export default Dashboard