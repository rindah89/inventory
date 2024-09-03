import React from 'react'
import Link from 'next/link'

export default function SubscriptionCard() {
  return (
    <div className="px-1 py-3">
        <div className="rounded-lg p-3 mt-3 bg-slate-900">
            <div className="border-b border-slate-700 pb-3">
            <p className="border-l border-orange-200 pl-2">Your premium plan's trial expires in <span className="text-orange-200 text-xs">13 days</span> </p>
            
            </div>
            <div className="flex text-xs justify-center">
                <button className="p-1 border-r border-slate-600 "> Change Plan</button>
                <Link href="#" className="p-1"> Upgrade</Link>
            </div>
    </div>
    </div>
     )
}

