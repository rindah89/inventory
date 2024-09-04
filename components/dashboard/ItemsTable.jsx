'use client'

import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown, Search, ChevronDown, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

const itemsData = [
  { id: 1, name: "Coffee Table", sku: "Item 1 sku", type: "Service", description: "A sleek, modern coffee table with a glas...", rate: 8127.00 },
  { id: 2, name: "Storage Cabinet", sku: "Item 2 sku", type: "Service", description: "A versatile storage cabinet with adjusta...", rate: 3120.00 },
  { id: 3, name: "Executive Office Desk", sku: "Item 3 sku", type: "Service", description: "", rate: null },
  { id: 4, name: "Queen Size Bed", sku: "Item 4 sku", type: "Service", description: "", rate: null },
  { id: 5, name: "Executive Office Desk", sku: "Item 5 sku", type: "Service", description: "A spacious executive desk with storage...", rate: 6392.00 },
  { id: 6, name: "Queen Size Bed", sku: "Item 6 sku", type: "Service", description: "Mid-century wooden double bed. Scan...", rate: 4579.00 },
];

const ItemsTable = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleItemSelect = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = (checked) => {
    setSelectedItems(checked ? itemsData.map(item => item.id) : []);
  };

  const SelectionHeader = () => (
    <div className="bg-blue-50 p-4 flex justify-between items-center mb-4">
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="primary" className="bg-blue-500 hover:bg-blue-600 text-white">
              New Transaction <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white">
            <DropdownMenuItem className="hover:bg-blue-100 transition-colors duration-200">Sales Order</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-blue-100 transition-colors duration-200">Invoice</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-blue-100 transition-colors duration-200">Purchase Order</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-blue-100 transition-colors duration-200">Bill</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <span className="ml-4 text-blue-700">{selectedItems.length} Item(s) Selected</span>
      </div>
      <Button variant="ghost" onClick={() => setSelectedItems([])}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto py-10">
      {selectedItems.length > 0 && <SelectionHeader />}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[3%]">
              <Checkbox 
                checked={selectedItems.length === itemsData.length}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead className="w-[3%]"></TableHead>
            <TableHead className="w-[20%]">
              NAME
              <Button variant="ghost" size="sm" className="ml-2">
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="w-[15%]">SKU</TableHead>
            <TableHead className="w-[10%]">TYPE</TableHead>
            <TableHead className="w-[30%]">DESCRIPTION</TableHead>
            <TableHead className="w-[15%] text-right">RATE</TableHead>
            <TableHead className="w-[4%]">
              <Search className="h-4 w-4" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {itemsData.map((item) => (
            <TableRow key={item.id} className={selectedItems.includes(item.id) ? "bg-blue-50" : ""}>
              <TableCell>
                <Checkbox 
                  checked={selectedItems.includes(item.id)}
                  onCheckedChange={() => handleItemSelect(item.id)}
                />
              </TableCell>
              <TableCell>
                <div className="w-8 h-8 bg-gray-200 rounded"></div>
              </TableCell>
              <TableCell className="font-medium text-blue-600">{item.name}</TableCell>
              <TableCell className="text-green-600">{item.sku}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell className="text-gray-500">{item.description}</TableCell>
              <TableCell className="text-right">{item.rate ? `$${item.rate.toFixed(2)}` : ''}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ItemsTable;