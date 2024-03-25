import React from 'react'
import StoreLayout from '@/components/Customer/Store/Layout/StoreLayout';
import EditSubGlobalCategory from '@/components/Customer/Store/SubGlobalCategories/EditSubGlobalCategory';

const EditSubGlobalCategoryPage = () => {
  return <StoreLayout children={<EditSubGlobalCategory />} />;
}

export default EditSubGlobalCategoryPage