import Layout from '@/components/Layout/Layout';
import Users from '@/components/Users/Users';
import React from 'react'

const UsersPage = () => {
  return <Layout children={<Users />} />;
}

export default UsersPage