import TaxiDashboard from '@/components/Seller/Taxi/Dashboard/TaxiDashboard';
import TaxiLayout from '@/components/Seller/Taxi/Layout/TaxiLayout'
import React from 'react'

const TaxiDashboardPage = () => {
  return <TaxiLayout children={<TaxiDashboard />} />;
}

export default TaxiDashboardPage