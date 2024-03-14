import React from 'react'
import StoreDashboard from '@/components/Customer/Store/Dashboard/StoreDashboard';
import StoreLayout from '@/components/Customer/Store/Layout/StoreLayout';

const StoreDashboardPage = () => {
  return <StoreLayout children={<StoreDashboard />} />;
}

export default StoreDashboardPage