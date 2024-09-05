'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react'; // Importing X icon from lucide-react
import NewItemGroup2 from '../../../../../../components/dashboard/NewItemGroup2'

const NewItemGroup = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/dashboard/inventory/item-groups'); // Redirect to the inventory page
  };

  return (
    <div>
    <div className="flex justify-between items-center p-3 border border-gray-300 rounded-md bg-gray-50 w-full">
      <span className="text-lg font-semibold">New Item Group</span>
      <X 
        className="w-5 h-5 text-gray-500 cursor-pointer hover:text-red-500" 
        onClick={handleRedirect} 
      />
    </div>
    <NewItemGroup2/>
    </div>
  );
};

export default NewItemGroup;

