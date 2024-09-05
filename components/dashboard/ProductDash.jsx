'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronDown, Image as ImageIcon } from 'lucide-react'

const ProductDetails = () => (
    <div className="bg-white  rounded-lg shadow">
        <div className="bg-slate-200">
        <h2 className="py-3 border-b border-slate-300
         px-6 text-xl font-semibold mb-4">Product Details</h2>

        </div>
      <div className="flex">
        <div className="flex-1 space-y-4 p-6 border-r border-slate-200">
          <div className="flex justify-between items-center">
            <span className="text-red-500">Low Stock Items</span>
            <span className="font-semibold text-lg">22</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">All Item Groups</span>
            <span className="font-semibold text-lg">34</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">All Items</span>
            <span className="font-semibold text-lg">129</span>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center">
<div className='bg-slate-200'>
<h3 className="text-lg font-semibold mb-2 text-gray-600">Active Items</h3>

    </div>          <div className="relative w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#4FD1C5"
                strokeWidth="3"
                strokeDasharray="78, 100"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-700">78%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  

const TopSellingItem = ({ name, value }) => (
  <div className="bg-white p-4 rounded-lg shadow text-center">
    <div className="w-16 h-16 mx-auto mb-2 bg-gray-200 rounded-lg flex items-center justify-center">
      <ImageIcon className="text-gray-400" />
    </div>
    <h3 className="text-sm text-gray-600 mb-1">{name}</h3>
    <p className="text-xl font-bold">{value}<span className="text-sm font-normal">Mtr</span></p>
  </div>
)

const Dropdown = ({ selected, setSelected }) => {
  const [isOpen, setIsOpen] = useState(false)
  const options = ["Today", "Yesterday", "This Week", "This Month", "This Year", "Previous Week", "Previous Month", "Previous Year", "Custom"]

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selected}
          <ChevronDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {options.map((option) => (
              <a
                key={option}
                href="#"
                className={`${
                  option === selected ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                } block px-4 py-2 text-sm`}
                onClick={(e) => {
                  e.preventDefault()
                  setSelected(option)
                  setIsOpen(false)
                }}
              >
                {option}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function ProductDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('This Month')

  const topSellingItems = [
    { name: 'Executive Office Desk', value: 144 },
    { name: 'Patio Dining Set', value: 23 },
    { name: 'Storage Cabinet', value: 337 },
  ]

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductDetails />
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Top Selling Items</h2>
            <Dropdown selected={selectedPeriod} setSelected={setSelectedPeriod} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {topSellingItems.map((item, index) => (
              <TopSellingItem key={index} name={item.name} value={item.value} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}