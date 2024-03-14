import React from 'react'
import DashboardCards from '../DashboardCards/DashboardCards'
import css from "./StoreDashboard.module.scss";

const StoreDashboard = () => {
  return (
    <div className={css.dashboardMain}>
      <div className={css.top}>Dashboard</div>
      <DashboardCards />
    </div>
  )
}

export default StoreDashboard