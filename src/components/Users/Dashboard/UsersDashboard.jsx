import React from 'react'
import DashboardCards from '../DashboardCards/DashboardCards'
import css from "./UsersDashboard.module.scss";

const UsersDashboard = () => {
  return (
    <div className={css.dashboardMain}>
      <div className={css.top}>Dashboard</div>
      <DashboardCards />
    </div>
  )
}

export default UsersDashboard