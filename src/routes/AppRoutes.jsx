import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Main from '../components/Main/Main';
import Login from '../components/Auth/Login/Login';
import Protected from '@/components/Protected/Protected';
import TaxiDashboardPage from '@/pages/Seller/Taxi/TaxiDashboardPage';
import TaxiDriverApplicationsPage from '@/pages/Seller/Taxi/TaxiDriverApplicationsPage';
import TaxiVehicleApplicationsPage from '@/pages/Seller/Taxi/TaxiVehicleApplicationsPage';
import StoreDashboardPage from '@/pages/Customer/Store/StoreDashboardPage';
import StoreGlobalCategoriesPage from '@/pages/Customer/Store/StoreGlobalCategoriesPage';
import StoreAddGlobalCategoryPage from '@/pages/Customer/Store/StoreAddGlobalCategoryPage';
import StoreSubGlobalCategoriesPage from '@/pages/Customer/Store/StoreSubGlobalCategoriesPage';
import StoreAddSubGlobalCategoryPage from '@/pages/Customer/Store/StoreAddSubGlobalCategoryPage';
import StoreAddFeaturesPage from '@/pages/Customer/Store/StoreAddFeaturesPage';
import StoreFeaturesPage from '@/pages/Customer/Store/StoreFeaturesPage';
import EditSubGlobalCategoryPage from '@/pages/Customer/Store/EditSubGlobalCategoryPage';
import EditFeaturesPage from '@/pages/Customer/Store/EditFeaturesPage';
import SizesPage from '@/pages/Customer/Store/SizesPage';
import WeightsPage from '@/pages/Customer/Store/WeightsPage';
import BrandsPage from '@/pages/Customer/Store/BrandsPage';

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
      <Route
        exact
        path="/admin/store/globalCategories"
        element={<Protected Component={StoreGlobalCategoriesPage} />}
      />
      <Route
        exact
        path="/admin/store/addGlobalCategory"
        element={<Protected Component={StoreAddGlobalCategoryPage} />}
      />
      <Route
        exact
        path="/admin/store/subGlobalCategories"
        element={<Protected Component={StoreSubGlobalCategoriesPage} />}
      />
      <Route
        exact
        path="/admin/store/addSubGlobalCategory"
        element={<Protected Component={StoreAddSubGlobalCategoryPage} />}
      />
      <Route
        exact
        path="/admin/store/edit/subGlobalCategory/:id"
        element={<Protected Component={EditSubGlobalCategoryPage} />}
      />
      <Route
        exact
        path="/admin/store/addFeatures"
        element={<Protected Component={StoreAddFeaturesPage} />}
      />
      <Route
        exact
        path="/admin/store/features"
        element={<Protected Component={StoreFeaturesPage} />}
      />
      <Route
        exact
        path="/admin/store/edit/features/:id"
        element={<Protected Component={EditFeaturesPage} />}
      />
      <Route
        exact
        path="/admin/store/sizes"
        element={<Protected Component={SizesPage} />}
      />
      <Route
        exact
        path="/admin/store/weights"
        element={<Protected Component={WeightsPage} />}
      />
      <Route
        exact
        path="/admin/store/brands"
        element={<Protected Component={BrandsPage} />}
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