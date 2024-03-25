import React from 'react'
import StoreLayout from '@/components/Customer/Store/Layout/StoreLayout'
import Weights from '@/components/Customer/Store/Weights/Weights'

const WeightsPage = () => {
  return (
    <StoreLayout children={<Weights />} />
  )
}

export default WeightsPage