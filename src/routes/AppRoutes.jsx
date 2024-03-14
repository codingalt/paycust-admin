import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Main from '../components/Main/Main';
import Login from '../components/Auth/Login/Login';
import Protected from '@/components/Protected/Protected';
import TaxiDashboardPage from '@/pages/Seller/Taxi/TaxiDashboardPage';
import TaxiDriverApplicationsPage from '@/pages/Seller/Taxi/TaxiDriverApplicationsPage';
import TaxiVehicleApplicationsPage from '@/pages/Seller/Taxi/TaxiVehicleApplicationsPage';
import StoreDashboardPage from '@/pages/Customer/Store/StoreDashboardPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth Rotes  */}
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/" element={<Main />} />

      {/* Client Side  */}

      {/* Store Routes  */}
      <Route
        exact
        path="/admin/store/dashboard"
        element={<Protected Component={StoreDashboardPage} />}
      />

      {/* Seller Side  */}

      {/* Taxi Routes  */}
      <Route
        exact
        path="/admin/taxi/dashboard"
        element={<Protected Component={TaxiDashboardPage} />}
      />
      <Route
        exact
        path="/admin/taxi/driverApplications"
        element={<Protected Component={TaxiDriverApplicationsPage} />}
      />
      <Route
        exact
        path="/admin/taxi/vehicleApplications"
        element={<Protected Component={TaxiVehicleApplicationsPage} />}
      />
    </Routes>
  );
}

export default AppRoutes