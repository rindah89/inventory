'use client'

import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Home, ShoppingBasket, ShoppingCart, BaggageClaim, ShoppingBag, Cable, BarChart4, FilePlus2, ChevronDown } from 'lucide-react'
import Link from 'next/link';
import SubscriptionCard from '../../components/dashboard/SubscriptionCard'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../components/ui/collapsible"

const NavItem = ({ icon: Icon, text, href, isCollapsed, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (children) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className={`flex items-center justify-between w-full p-2 rounded-md hover:bg-slate-700 transition-all duration-300 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="flex items-center space-x-2">
            <Icon className='w-5 h-5' />
            <span className={`transition-all duration-300 ${isCollapsed ? 'w-0 overflow-hidden' : 'w-auto'}`}>
              {text}
            </span>
          </div>
          {!isCollapsed && <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />}
        </CollapsibleTrigger>
        <CollapsibleContent className="ml-6 mt-1 space-y-1">
          {children}
        </CollapsibleContent>
      </Collapsible>
    )
  }

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
    { 
      icon: BaggageClaim, 
      text: 'Inventory', 
      children: [
        { text: 'Items', href: '/dashboard/inventory' },
        { text: 'Composite Items', href: '#composite-items' },
        { text: 'Item Groups', href: '/dashboard/inventory/item-groups' },
        { text: 'Price Lists', href: '#price-lists' },
        { text: 'Inventory Adjustments', href: '#inventory-adjustments' },
      ]
    },
    { icon: ShoppingBasket, 
      text: 'Sales',
      children:[
        { text: 'Customers', href: '#items' },
        { text: 'Sales Orders', href: '#composite-items' },
        { text: 'Packages', href: '#item-groups' },
        { text: 'Shipments', href: '#price-lists' },
        { text: 'Invoices', href: '#inventory-adjustments' },
        { text: 'Payments Received', href: '#inventory-adjustments' },
        { text: 'Sales Returns', href: '#inventory-adjustments' },
        { text: 'Credit Notes', href: '#inventory-adjustments' },

      ] },
    { icon: ShoppingBag,
       text: 'Purchases',
       children: [
        { text: 'Vendors', href: '#items' },
        { text: 'Expenses', href: '#composite-items' },
        { text: 'Purchase Orders', href: '#item-groups' },
        { text: 'Bills', href: '#price-lists' },
        { text: 'Payments Made', href: '#inventory-adjustments' },
        { text: 'Vendor Credits', href: '#inventory-adjustments' },
       ] },
       
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
          <NavItem key={index} {...item} isCollapsed={isCollapsed}>
            {item.children && !isCollapsed && item.children.map((child, childIndex) => (
              <Link key={childIndex} href={child.href} className="block py-1 px-2 text-sm hover:bg-slate-700 rounded">
                {child.text}
              </Link>
            ))}
          </NavItem>
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