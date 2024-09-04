'use client'
import React, { useState, useEffect } from 'react'
import { CheckCircle2, Package, Truck, DollarSign, BarChart2, Loader } from 'lucide-react'
import Link from 'next/link'

const ActivityCard = ({ title, value, subtitle, icon: Icon, color, isLoading, href }) => (
  <Link 
    href={href}
    className={`cursor-pointer p-6 rounded-lg bg-white border border-slate-200 hover:border-blue-400 flex items-center flex-col gap-3 transition-all duration-300 shadow-sm hover:shadow-md`}
    role="region"
    aria-label={title}
  >
    {isLoading ? (
      <Loader className="w-8 h-8 text-slate-400 animate-spin" />
    ) : (
      <>
        <h4 className={`font-semibold text-3xl text-${color}-600`} aria-label={`${value} ${subtitle}`}>{value}</h4>
        <small className='text-slate-500'>{subtitle}</small>
        <div className={`flex items-center space-x-2 text-slate-600`}>
          <Icon className='w-5 h-5' aria-hidden="true" />
          <span className='uppercase text-xs font-medium'>{title}</span> 
        </div>
      </>
    )}
  </Link>
)

const SummaryCard = ({ title, value, icon: Icon, color, isLoading, href }) => (
  <Link 
    href={href}
    className={`cursor-pointer px-4 py-3 rounded-lg bg-white border border-slate-200 hover:border-blue-400 flex items-center justify-between gap-3 transition-all duration-300 shadow-sm hover:shadow-md mb-4`}
    role="region"
    aria-label={title}
  >
    {isLoading ? (
      <Loader className="w-6 h-6 text-slate-400 animate-spin" />
    ) : (
      <>
        <div className={`flex items-center space-x-3 text-slate-600`}>
          <Icon className='w-6 h-6' aria-hidden="true" />
          <h2 className='uppercase text-sm font-medium'>{title}</h2>
        </div>
        <h4 className={`font-semibold text-2xl text-${color}-600`} aria-label={`${value} ${title}`}>{value}</h4>
      </>
    )}
  </Link>
)

export default function SalesActivity() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const activityData = [
    { title: 'To be packed', value: '10', subtitle: 'Qty', icon: CheckCircle2, color: 'blue', href: '#' },
    { title: 'To be shipped', value: '5', subtitle: 'Qty', icon: Package, color: 'green', href: '#' },
    { title: 'To be delivered', value: '8', subtitle: 'Qty', icon: Truck, color: 'yellow', href: '#' },
    { title: 'To be invoiced', value: '$1,200', subtitle: 'Amount', icon: DollarSign, color: 'purple', href: '#' },
  ]

  const summaryData = [
    { title: 'Quantity in hand', value: '150', icon: Package, color: 'blue', href: '#' },
    { title: 'Quantity to be received', value: '30', icon: Truck, color: 'green', href: '#' },
    { title: 'Low stock items', value: '5', icon: BarChart2, color: 'red', href: '#' },
  ]

  return (
    <div className='bg-gradient-to-br from-blue-50 to-blue-100 border-b border-slate-300 p-8 lg:grid lg:grid-cols-12 gap-8'>
      <div className="col-span-8 mb-8 lg:mb-0 border-r border-slate-300 pr-4">
        <h2 className='mb-6 text-2xl font-semibold text-slate-800'>Sales Activity</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {activityData.map((item, index) => (
            <ActivityCard key={index} {...item} isLoading={isLoading} />
          ))}
        </div>
      </div>
      <div className="col-span-4">
        <h2 className='mb-6 text-2xl font-semibold text-slate-800'>Inventory Summary</h2>
        <div className="space-y-4">
          {summaryData.map((item, index) => (
            <SummaryCard key={index} {...item} isLoading={isLoading} />
          ))}
        </div>
      </div>
    </div>
  )
}