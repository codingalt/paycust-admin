import React from 'react'
import StoreLayout from '@/components/Customer/Store/Layout/StoreLayout';
import SubGlobalCategories from '@/components/Customer/Store/SubGlobalCategories/SubGlobalCategories';

const StoreSubGlobalCategoriesPage = () => {
  return <StoreLayout children={<SubGlobalCategories />} />;
}

export default StoreSubGlobalCategoriesPage;