import Dashboard from '@/components/Dashboard/Dashboard';
import Layout from '@/components/Layout/Layout';
import React from 'react'

const DashboardPage = () => {
  return <Layout children={<Dashboard />} />;
}

export default DashboardPage