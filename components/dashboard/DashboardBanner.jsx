'use client'

import { X } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'

export default function DashboardBanner() {
  const [isClosing, setIsClosing] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => setIsHidden(true), 300) // match this with transition duration
      return () => clearTimeout(timer)
    }
  }, [isClosing])

  if (isHidden) return null

  const handleClose = () => {
    setIsClosing(true)
  }

  return (
    <div 
      className="grid grid-cols-12 items-center py-6 px-8 bg-white relative overflow-hidden"
      style={{
        maxHeight: isClosing ? '0' : '1000px',
        opacity: isClosing ? 0 : 1,
        transition: 'max-height 300ms ease-out, opacity 300ms ease-out',
      }}
    >
      <div className="col-span-2">
        <Image
          width={150}
          height={150}
          src="/bankcard.jpg"
          alt="Bank Card"
        />
      </div>
      <div className="col-span-6">
        <h2 className='font-bold text-2xl'>Start accepting payments</h2>
        <p>Businesses are moving towards online payments as they are easy, secure and fast. Try them for your business today</p>
      </div>
      <div className="col-span-3">
        <button className='py-2.5 px-4 uppercase text-sm bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors'>
          Enable
        </button>
      </div>
      <button 
        onClick={handleClose} 
        className="absolute top-4 right-16 p-1 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Close banner"
      >
        <X className='text-slate-500'/>
      </button>
    </div>
  )
}