import React from 'react'
import GlobalCategories from '@/components/Customer/Store/GlobalCategories/GlobalCategories';
import StoreLayout from '@/components/Customer/Store/Layout/StoreLayout';

const StoreGlobalCategoriesPage = () => {
  return <StoreLayout children={<GlobalCategories />} />;
}

export default StoreGlobalCategoriesPage