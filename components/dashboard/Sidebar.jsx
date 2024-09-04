'use client'

import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Home, ShoppingBasket, ShoppingCart, BaggageClaim, ShoppingBag, Cable, BarChart4, FilePlus2 } from 'lucide-react'
import Link from 'next/link';
import SubscriptionCard from '../../components/dashboard/SubscriptionCard'

const NavItem = ({ icon: Icon, text, href, isCollapsed }) => {
  return (
    <Link 
      href={href} 
      className={`flex items-center space-x-2 p-2 rounded-md hover:bg-slate-700 transition-all duration-300 ${isCollapsed ? 'justify-center' : ''}`}
      title={isCollapsed ? text : ''}
    >
      <Icon className='w-5 h-5' />
      <span className={`transition-all duration-300 ${isCollapsed ? 'w-0 overflow-hidden' : 'w-auto'}`}>
        {text}
      </span>
    </Link>
  )
}

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navItems = [
    { icon: Home, text: 'Home', href: '#' },
    { icon: BaggageClaim, text: 'Inventory', href: '#' },
    { icon: ShoppingBasket, text: 'Sales', href: '#' },
    { icon: ShoppingBag, text: 'Purchases', href: '#' },
    { icon: Cable, text: 'Integrations', href: '#' },
    { icon: BarChart4, text: 'Reports', href: '#' },
    { icon: FilePlus2, text: 'Documents', href: '#' },
  ];

  return (
    <div 
      className={`h-screen bg-slate-800 text-slate-50 fixed left-0 top-0 flex flex-col transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}
      aria-expanded={!isCollapsed}
    >
      <div className="flex items-center bg-slate-950 gap-x-2 py-4 px-2 overflow-hidden">
        <ShoppingCart className="w-6 h-6 flex-shrink-0"/>
        <span className={`font-semibold text-l whitespace-nowrap transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
          Inventory
        </span>
      </div>

      <nav className="flex flex-col gap-3 px-3 py-6 flex-grow overflow-y-auto">
        {navItems.map((item, index) => (
          <NavItem key={index} {...item} isCollapsed={isCollapsed} />
        ))}
      </nav>

      <div className="mt-auto"> 
        <div className={`transition-all duration-300 overflow-hidden ${isCollapsed ? 'h-0' : 'h-auto'}`}>
          <SubscriptionCard />
        </div>

        <div className="bg-slate-950 py-4 px-2">
          <button 
            onClick={toggleSidebar} 
            className="flex items-center justify-center w-full hover:bg-slate-800 rounded-md p-2 transition-colors duration-300"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}