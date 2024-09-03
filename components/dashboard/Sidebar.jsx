import { Banknote, ChevronLeft, Home, ShoppingBasket, ShoppingCart, BaggageClaim, ShoppingBag, Cable, BarChart, BarChart4, FilePlus2 } from 'lucide-react'
import React from 'react'
import Link from 'next/link';
import SubscriptionCard from '../../components/dashboard/SubscriptionCard'

export default function Sidebar() {
  return (
    <div className='w-64 min-h-screen bg-slate-800 text-slate-50 fixed'>

        <div className="flex flex-col">
<div className="flex  items-center bg-slate-950 gap-x-2 py-4 px-2 ">
    <ShoppingCart/>
    <span className="font-semibold text-l ">Inventory</span>
        </div>


<nav className="flex flex-col gap-3 px-3 py-6">
    <Link href="#" className='flex items-center space-x-2 bg-blue-600 text-slate-50 p-2 rounded-md '> 
    <Home className='w-4 h-4'/>
    <span>Home</span>
    </Link>

    <button className='flex items-center space-x-2 p-2'> 
    <BaggageClaim className='w-4 h-4'/>
    <span>Inventory</span>
    </button>
    
    <button  className='flex items-center space-x-2 p-2'> 
    <ShoppingBasket className='w-4 h-4'/>
    <span>sales</span>
    </button>

    <button  className='flex items-center space-x-2 p-2'> 
    <ShoppingBag className='w-4 h-4'/>
    <span>Purchases</span>
    </button>

    <Link href="#" className='flex items-center space-x-2 p-2'> 
    <Cable className='w-4 h-4'/>
    <span>Integrations</span>
    </Link>

    <Link href="#" className='flex items-center space-x-2 p-2'> 
    <BarChart4 className='w-4 h-4'/>
    <span>Reports</span>
    </Link>

    <Link href="#" className='flex items-center space-x-2 p-2'> 
    <FilePlus2 className='w-4 h-4'/>
    <span>Documents</span>
    </Link>
</nav>




        
    </div>

    <SubscriptionCard/>

    <div className="flex flex-col ">
        <button className="flex  items-center bg-slate-950 py-4 px-2 justify-center ">
    <ChevronLeft/>
        </button>
        </div>

    </div>
  );
}
