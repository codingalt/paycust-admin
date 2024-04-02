import UsersDashboard from '@/components/Users/Dashboard/UsersDashboard'
import UsersLayout from '@/components/Users/Layout/UsersLayout'
import React from 'react'

const UsersDashboardPage = () => {
  return (
    <UsersLayout children={<UsersDashboard />} />
  )
}

export default UsersDashboardPage