import React from 'react'
import Header from "../../components/dashboard/Header"
import Sidebar from '../../components/dashboard/sidebar';

export default function Layout({children}) {
  return (
    <div className='flex'>
       <Sidebar/>
        <main className='w-full bg-slate-100 mn-h-screen ml-60'>
           <Header/>
            {children}
        </main>
    </div>
  );
}
