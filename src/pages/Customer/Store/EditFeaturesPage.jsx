import React from 'react'
import EditFeatures from '@/components/Customer/Store/Features/EditFeatures';
import StoreLayout from '@/components/Customer/Store/Layout/StoreLayout';

const EditFeaturesPage = () => {
  return <StoreLayout children={<EditFeatures />} />;
}

export default EditFeaturesPage