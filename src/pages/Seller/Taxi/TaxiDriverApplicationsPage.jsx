import DriverApplications from '@/components/Seller/Taxi/DriverApplications/DriverApplications';
import TaxiLayout from '@/components/Seller/Taxi/Layout/TaxiLayout';
import React from 'react'

const TaxiDriverApplicationsPage = () => {
  return (
    <TaxiLayout children={<DriverApplications />} />
  )
}

export default TaxiDriverApplicationsPage