import React from 'react'
import AddDeals from '@/components/Customer/Store/Deals/AddDeals';
import StoreLayout from '@/components/Customer/Store/Layout/StoreLayout';

const AddDealsPage = () => {
  return <StoreLayout children={<AddDeals />} />;
}

export default AddDealsPage