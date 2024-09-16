'use client'

import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown, Search, ChevronDown, X, MoreHorizontal } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { prisma } from "../lib/db";


async function getData() {
  const itemsData = await prisma.product.findMany({
    orderBy:{
      createdAT: "desc",
    },
  });

  return itemsData;
}


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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

export default async function itemsTable(){
 const  itemsData = await getData();

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
            <TableHead className="w-[8%]">IMAGE</TableHead>
            <TableHead className="w-[25%]">
              NAME
              <Button variant="ghost" size="sm" className="ml-2">
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="w-[15%]">SKU</TableHead>
            <TableHead className="w-[10%]">TYPE</TableHead>
            <TableHead className="w-[24%]">DESCRIPTION</TableHead>
            <TableHead className="w-[12%] text-right">RATE</TableHead>
            <TableHead className="w-[3%]">
              <Search className="h-4 w-4" />
            </TableHead>
            <TableHead>Action</TableHead>
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
                {item.images && item.images.length > 0 ? (
                  <Image 
                    src={item.images[0]} 
                    alt={item.name} 
                    width={50} 
                    height={50} 
                    className="object-cover rounded"
                  />
                ) : (
                  <div className="w-[50px] h-[50px] bg-gray-200 rounded"></div>
                )}
              </TableCell>
              <TableCell className="font-medium text-blue-600">{item.name}</TableCell>
              <TableCell className="text-green-600">{item.sku || 'N/A'}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell className="text-gray-500">{item.salesDescription || 'No description'}</TableCell>
              <TableCell className="text-right">{item.sellingPrice ? `$${item.sellingPrice.toFixed(2)}` : 'N/A'}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <MoreHorizontal className='h-4 w-4'/>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator/>
                  <DropdownMenuItem asChild>
                    <Link href={`/dashboard/inventory/items/${item.id}`}>Edit</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

