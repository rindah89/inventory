import React from 'react';
import FixedHeader from '@/components/dashboard/fixed-header';
import ItemsTable from '@/components/dashboard/ItemsTable';

export default function Inventory() {
  return (
    <div className="min-h-screen bg-gray-100">
      <FixedHeader />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Inventory</h1>
        <div className="bg-white rounded-lg shadow">
          <ItemsTable />
        </div>
      </main>
    </div>
  );
}