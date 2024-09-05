'use client'

import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Checkbox } from "../ui/checkbox";
import { ArrowUpDown, Search,  } from 'lucide-react';
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";

const ProductDisplay = ({ items, view }) => {
    const [selectedItems, setSelectedItems] = React.useState([]);
  
    const handleItemSelect = (itemId) => {
      setSelectedItems(prev => 
        prev.includes(itemId) 
          ? prev.filter(id => id !== itemId)
          : [...prev, itemId]
      );
    };
  
    const handleSelectAll = (checked) => {
      setSelectedItems(checked ? items.map(item => item.id) : []);
    };
  
    const ListView = () => (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[3%]">
              <Checkbox 
                checked={selectedItems.length === items.length}
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
          {items.map((item) => (
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
              <TableCell className="text-right">${item.rate.toFixed(2)}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  
    const CardView = () => (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="w-full h-40 bg-gray-200 rounded mb-2"></div>
              <h3 className="font-semibold text-lg">{item.name}</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">SKU: {item.sku}</p>
              <p className="text-sm">{item.type}</p>
              <p className="mt-2 font-bold">${item.rate.toFixed(2)}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  
    return view === 'list' ? <ListView /> : <CardView />;
  };
  
  export default ProductDisplay;