import React from 'react'
import Brands from '@/components/Customer/Store/Brands/Brands';
import StoreLayout from '@/components/Customer/Store/Layout/StoreLayout';

const BrandsPage = () => {
  return <StoreLayout children={<Brands />} />;
}

export default BrandsPage