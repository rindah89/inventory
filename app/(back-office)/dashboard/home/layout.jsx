import React from 'react'
import HomeNav from "../../../../components/dashboard/HomeNav"

export default function Layout({children}) {
  return (
    <div className="bg-orange-700">
        <HomeNav/>
        {children}
    </div>
  )
}
