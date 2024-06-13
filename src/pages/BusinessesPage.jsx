import Businesses from '@/components/Businesses/Businesses';
import Layout from '@/components/Layout/Layout';
import React from 'react'

const BusinessesPage = () => {
  return <Layout children={<Businesses />} />;
}

export default BusinessesPage