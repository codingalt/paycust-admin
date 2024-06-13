import Categories from '@/components/Categories/Categories';
import Layout from '@/components/Layout/Layout';
import React from 'react'

const CategoriesPage = () => {
  return <Layout children={<Categories />} />;
}

export default CategoriesPage