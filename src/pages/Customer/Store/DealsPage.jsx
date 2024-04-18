import Deals from '@/components/Customer/Store/Deals/Deals';
import StoreLayout from '@/components/Customer/Store/Layout/StoreLayout';
import React from 'react'

const DealsPage = () => {
  return <StoreLayout children={<Deals />} />;
}

export default DealsPage