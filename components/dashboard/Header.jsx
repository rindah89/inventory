import { Bell, ChevronDown, History, LayoutGrid, Plus, Settings, Users } from 'lucide-react'
import React from 'react'
import SearchInput from './SearchInput'
import Image from 'next/image'

export default function Header() {
  return (
    <div className=' border border-b border-slate-200  bg-slate-50 h-12 flex items-center justify-between px-8'>
        <div className="flex gap-3">
            <button>
            <History className='w-6 h-6' />
            </button>
            <SearchInput/>

        </div>
        <div className="flex items-center gap-3">

<div className='pr-2 border-r border-gray-300'>
<button className='bg-blue-500 p-1 rounded-lg'>
    <Plus className='text-slate-50 w-4 h-4 '/>
</button>

</div>

<div className="flex items-center pr-2 border-r border-gray-30 space-x-2">
<button className='hover:bg-slate-200 p-1 rounded-lg pl-2'>
    <Users className='text-slate-900 w-4 h-4 '/>
</button>
<button className='hover:bg-slate-200 p-1 rounded-lg'>
    <Bell className='text-slate-900 w-4 h-4 '/>
</button>
<button className='hover:bg-slate-200 p-1 rounded-lg'>
    <Settings className='text-slate-900 w-4 h-4 '/>
</button>
</div>

<div className="flex items-center gap-6">
    <button className='flex '> <span>Panther</span>
    <ChevronDown className='w-3 h-3'/>
    </button>
    <button>
        <Image src="/userimage.jpg" width={96} height={96} className='rounded-full w-9 h-9 border border-slate-900'/>
    </button>
    <button>
        <LayoutGrid className='w-6 h-6 text-slate-900'/>
    </button>
</div>

        </div>
        
        </div>
  )
}
