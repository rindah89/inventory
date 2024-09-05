import React from 'react'
import DashboardBanner from "../../../../../components/dashboard/DashboardBanner"
import SalesActivity from "../../../../../components/dashboard/SalesActivity"
import ProductDashboard from "../../../../../components/dashboard/ProductDash"


export default function Overview() {
  return (
    <div>
      <DashboardBanner/>
      <SalesActivity/>
      <ProductDashboard/>
    </div>
  )
}
