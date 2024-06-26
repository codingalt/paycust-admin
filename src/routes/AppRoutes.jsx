import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Login from '../components/Auth/Login/Login';
import Protected from '@/components/Protected/Protected';
import DashboardPage from '@/pages/DashboardPage';
import CategoriesPage from '@/pages/CategoriesPage';
import AddCategoryPage from '@/pages/AddCategoryPage';
import SubCategoriesPage from '@/pages/SubCategoriesPage';
import AddSubCategoryPage from '@/pages/AddSubCategoryPage';
import BusinessesPage from '@/pages/BusinessesPage';
import UsersPage from '@/pages/UsersPage';
import EditSubCategoryPage from '@/pages/EditSubCategoryPage';
import EditCategoryPage from '@/pages/EditCategoryPage';
import TagsPage from '@/pages/TagsPage';
import EditTagPage from '@/pages/EditTagPage';

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
        element={<Protected Component={AddSubCategoryPage} />}
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
      <Route
        exact
        path="/admin/edit/subCategory/:id"
        element={<Protected Component={EditSubCategoryPage} />}
      />
      <Route
        exact
        path="/admin/edit/category/:id"
        element={<Protected Component={EditCategoryPage} />}
      />
      <Route
        exact
        path="/admin/tags"
        element={<Protected Component={TagsPage} />}
      />
      <Route
        exact
        path="/admin/edit/tag/:id"
        element={<Protected Component={EditTagPage} />}
      />
    </Routes>
  );
}

export default AppRoutes