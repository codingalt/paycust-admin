import KycApprovals from '@/components/Users/KycApprovals/KycApprovals'
import UsersLayout from '@/components/Users/Layout/UsersLayout'
import React from 'react'

const KycApprovalsPage = () => {
  return (
    <UsersLayout children={<KycApprovals />} />
  )
}

export default KycApprovalsPage