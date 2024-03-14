import React from 'react'
import TaxiLayout from '@/components/Seller/Taxi/Layout/TaxiLayout';
import VehicleApplications from '@/components/Seller/Taxi/VehicleApplications/VehicleApplications';

const TaxiVehicleApplicationsPage = () => {
  return <TaxiLayout children={<VehicleApplications />} />;
}

export default TaxiVehicleApplicationsPage