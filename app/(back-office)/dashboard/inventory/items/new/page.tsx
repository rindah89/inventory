'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react'; // Importing X icon from lucide-react
import NewItem2 from '../../../../../../components/dashboard/NewItem2'

const NewItem = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/dashboard/inventory'); // Redirect to the inventory page
  };

  return (
    <div>
    <div className="flex justify-between items-center p-3 border border-gray-300 rounded-md bg-gray-50 w-full">
      <span className="text-lg font-semibold">New Item</span>
      <X 
        className="w-5 h-5 text-gray-500 cursor-pointer hover:text-red-500" 
        onClick={handleRedirect} 
      />
    </div>
    <NewItem2/>
    </div>
  );
};

export default NewItem;

