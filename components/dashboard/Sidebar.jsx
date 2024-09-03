import { Banknote, ChevronLeft, Home, ShoppingBasket, ShoppingCart, StretchHorizontal } from 'lucide-react'
import React from 'react'
import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className='w-56 min-h-screen bg-slate-800 text-slate-50 justify-between'>

        <div className="flex flex-col">
<div className="flex  items-center bg-slate-950 gap-x-2 py-4 px-2 ">
    <ShoppingCart/>
    <span className="font-semibold text-l ">Inventory</span>
        </div>


<nav className="flex flex-col g-4 p-3">
    <Link href="" className='flex items-center space-x-2'> 
    <Home className='w-4 h-4'/>
    <span>Home</span>
    </Link>

    <Link href="" className='flex items-center space-x-2'> 
    <StretchHorizontal className='w-4 h-4'/>
    <span>Inventory</span>
    </Link>
    
    <Link href="" className='flex items-center space-x-2'> 
    <ShoppingBasket className='w-4 h-4'/>
    <span>sales</span>
    </Link>
    <Link href="" className='flex items-center space-x-2'> 
    <Banknote className='w-4 h-4'/>
    <span>Purchases</span>
    </Link>
</nav>




        <div className="flex flex-col flex-end">
        <div className="flex  items-center bg-slate-950 py-4 px-2 ">
    <ChevronLeft/>
    <span className="font-semibold text-l ">Inventory</span>
        </div>
        </div>
    </div>
    </div>
  );
}
