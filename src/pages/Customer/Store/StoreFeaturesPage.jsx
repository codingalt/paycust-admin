import React from 'react'
import Features from '@/components/Customer/Store/Features/Features';
import StoreLayout from '@/components/Customer/Store/Layout/StoreLayout';

const StoreFeaturesPage = () => {
  return <StoreLayout children={<Features />} />;
}

export default StoreFeaturesPage