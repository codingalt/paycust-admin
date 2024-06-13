import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Login from '../components/Auth/Login/Login';
import Protected from '@/components/Protected/Protected';
import DashboardPage from '@/pages/DashboardPage';
import CategoriesPage from '@/pages/CategoriesPage';
import AddCategoryPage from '@/pages/AddCategoryPage';
import SubCategoriesPage from '@/pages/SubCategoriesPage';
import AddSubGlobalCategoryPage from '@/pages/AddSubGlobalCategoryPage';
import BusinessesPage from '@/pages/BusinessesPage';
import UsersPage from '@/pages/UsersPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth Rotes  */}
      <Route exact path="/" element={<Login />} />

      {/* Client Side  */}

      {/* Store Routes  */}
      <Route
        exact
        path="/admin/dashboard"
        element={<Protected Component={DashboardPage} />}
      />
      <Route
        exact
        path="/admin/categories"
        element={<Protected Component={CategoriesPage} />}
      />
      <Route
        exact
        path="/admin/addCategory"
        element={<Protected Component={AddCategoryPage} />}
      />
      <Route
        exact
        path="/admin/subCategories"
        element={<Protected Component={SubCategoriesPage} />}
      />
      <Route
        exact
        path="/admin/addSubCategory"
        element={<Protected Component={AddSubGlobalCategoryPage} />}
      />
      <Route
        exact
        path="/admin/businesses"
        element={<Protected Component={BusinessesPage} />}
      />
      <Route
        exact
        path="/admin/users"
        element={<Protected Component={UsersPage} />}
      />
      {/* <Route
        exact
        path="/admin/edit/subGlobalCategory/:id"
        element={<Protected Component={EditSubGlobalCategoryPage} />}
      /> */}
    </Routes>
  );
}

export default AppRoutes