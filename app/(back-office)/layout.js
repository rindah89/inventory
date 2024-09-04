import React from 'react'
import Header from "../../components/dashboard/Header"
import Sidebar from '../../components/dashboard/sidebar';

export default function Layout({children}) {
  return (
    <div className='flex h-screen overflow-hidden'>
      <Sidebar />
      <div className='flex flex-col flex-grow ml-64'> {/* Add ml-64 to offset the fixed sidebar */}
        <Header />
        <main className='flex-grow overflow-auto bg-slate-100 p-6'>
          {children}
        </main>
      </div>
    </div>
  );
}