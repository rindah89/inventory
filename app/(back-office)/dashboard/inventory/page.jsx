'use client'

import React, { useState } from 'react';
import FixedHeader from '../../../../components/dashboard/fixed-header';
import ProductDisplay from '../../../../components/dashboard/ProductDisplay';

const itemsData = [
  { id: 1, name: "Area Rug", sku: "Item 1 sku", type: "Digital_service", description: "A soft, high-quality area rug to a...", rate: 3857.00 },
  { id: 2, name: "Coffee Table", sku: "Item 2 sku", type: "Digital_service", description: "A sleek, modern coffee table wit...", rate: 2449.00 },
  { id: 3, name: "Coffee Table", sku: "Item 3 sku", type: "Digital_service", description: "A sleek, modern coffee table with a glas...", rate: 355.00 },
  { id: 4, name: "Dining Table and Chairs Set", sku: "Item 4 sku", type: "Digital_service", description: "A complete dining set with table and chairs", rate: 310.00 },
  { id: 5, name: "Area Rug", sku: "Item 5 sku", type: "Digital_service", description: "A soft, high-quality area rug to a...", rate: 8316.00 },
  { id: 6, name: "Executive Office Desk", sku: "Item 6 sku", type: "Digital_service", description: "A spacious executive desk with s...", rate: 1966.00 },
  { id: 7, name: "Sofa", sku: "Item 7 sku", type: "Goods", description: "A comfortable, modern sofa with...", rate: 2120.00 },
  { id: 8, name: "Queen Size Bed", sku: "Item 8 sku", type: "Goods", description: "Mid-century wooden double bed...", rate: 185.00 },
];

export default function Inventory() {
  const [view, setView] = useState('list');

  return (
    <div className="min-h-screen bg-gray-100">
      <FixedHeader view={view} setView={setView} />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Inventory</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <ProductDisplay items={itemsData} view={view} />
        </div>
      </main>
    </div>
  );
}