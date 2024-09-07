"use client";

import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { ChevronDown, Plus, Search, FileText } from "lucide-react";

const AllPurchaseOrdersTable = ({ purchaseOrders }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPurchaseOrders = useMemo(() => {
    return purchaseOrders.filter(order =>
      Object.values(order).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [purchaseOrders, searchTerm]);

  const getStatusStyle = (status) => {
    switch (status.toUpperCase()) {
      case 'OPEN':
        return 'text-blue-600';
      case 'CLOSED':
        return 'text-green-600';
      case 'CANCELLED':
        return 'text-gray-600';
      case 'DRAFT':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="container mx-auto py-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-semibold">All Purchase Orders</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-blue-600">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-white">
              <DropdownMenuItem>All Purchase Orders</DropdownMenuItem>
              <DropdownMenuItem>Open Purchase Orders</DropdownMenuItem>
              <DropdownMenuItem>Closed Purchase Orders</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="border-blue-500 text-blue-500 hover:bg-blue-50"
          >
            <FileText className="mr-2 h-4 w-4" /> In Transit Receives
          </Button>
          <Button
            variant="default"
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            <Plus className="mr-2 h-4 w-4" /> New
          </Button>
        </div>
      </div>
      <div className="mb-4">
        <div className="relative">
          <Input
            placeholder="Search purchase orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="w-[3%]">
              <Checkbox />
            </TableHead>
            <TableHead>DATE</TableHead>
            <TableHead>PURCHASE ORDER#</TableHead>
            <TableHead>REFERENCE#</TableHead>
            <TableHead>VENDOR NAME</TableHead>
            <TableHead>STATUS</TableHead>
            <TableHead className="text-right">AMOUNT</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPurchaseOrders.map((order, index) => (
            <TableRow key={index}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell className="text-blue-600">{order.purchaseOrderNumber}</TableCell>
              <TableCell>{order.referenceNumber}</TableCell>
              <TableCell>{order.vendorName}</TableCell>
              <TableCell className={getStatusStyle(order.status)}>
                {order.status.toUpperCase()}
              </TableCell>
              <TableCell className="text-right">${order.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllPurchaseOrdersTable;