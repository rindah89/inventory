'use client'

import { Building2 } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function HomeNav() {
  const pathname = usePathname();
  

const navLinks=[
{title: "Dashboard",
  href: "/dashboard/home/inventory-overview",
},
{title: "Getting Started",
  href: "/dashboard/home/getting-started",
},
{title: "Recent Updates",
  href: "/dashboard/home/updates",
},
{title: "Announcements",
  href: "/dashboard/home/announcements",
}

]

  return (
<div className=" h-32 p-5 header-bg bg-slate-50  border-b border-slate-300"  >

  <div className="flex space-x-3">
    <div className="flex w-12 h-12 bg-white items-center justify-center rounded-lg">
      <Building2/>
    </div>
    <div className="flex flex-col">
      <p className='text-slate-700 font-semibold'>Hello, Rindah</p>
      <span className='text-sm'> Garat</span>
    </div>
  </div>
  <nav className='sticky mt-6 flex space-x-4'>
        {navLinks.map((item, i) => (
          <Link 
            key={i} 
            href={item.href} 
            className={`py-1 ${pathname === item.href ? 'border-b-2 border-blue-600' : ''}`}
          >
            {item.title}
          </Link>
        ))}
      </nav>
</div>  )
}
