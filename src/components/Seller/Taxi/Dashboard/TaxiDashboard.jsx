import React from 'react'
import DashboardCards from '../DashboardCards/DashboardCards'
import css from "./TaxiDashboard.module.scss"

const TaxiDashboard = () => {
  return (
    <div className={css.dashboardMain}>
      <div className={css.top}>Dashboard</div>
      <DashboardCards />
    </div>
  )
}

export default TaxiDashboard