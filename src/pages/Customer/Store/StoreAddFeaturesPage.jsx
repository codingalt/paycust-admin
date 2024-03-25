import React from 'react'
import AddFeatures from '@/components/Customer/Store/AddFeatures/AddFeatures';
import StoreLayout from '@/components/Customer/Store/Layout/StoreLayout';

const StoreAddFeaturesPage = () => {
  return <StoreLayout children={<AddFeatures />} />;
}

export default StoreAddFeaturesPage