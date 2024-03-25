import React from 'react'
import AddGlobalCategory from '@/components/Customer/Store/AddGlobalCategory/AddGlobalCategory';
import StoreLayout from '@/components/Customer/Store/Layout/StoreLayout';

const StoreAddGlobalCategoryPage = () => {
  return (
    <StoreLayout children={<AddGlobalCategory />} />
  )
}

export default StoreAddGlobalCategoryPage