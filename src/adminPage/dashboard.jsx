import React from 'react'
import DonutCharts from '../adminAssets/donutCharts'
import IncomeCharts from '../adminAssets/incomeCharts'

const dashboardAdmin = () => {
  return (
    <div className='p-4 sm:ml-64'>
        <div className='flex gap-6'>
        <DonutCharts/>
        <IncomeCharts/>
        </div>
    </div>
  )
}

export default dashboardAdmin