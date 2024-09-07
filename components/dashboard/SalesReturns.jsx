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
import { ChevronDown, MoreVertical } from "lucide-react";

const PendingSalesReturnsTable = ({ salesReturns }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSalesReturns = useMemo(() => {
    return salesReturns.filter(salesReturn =>
      Object.values(salesReturn).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [salesReturns, searchTerm]);

  return (
    <div className="container mx-auto py-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-semibold">Pending Sales Returns</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-blue-600">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-white">
              <DropdownMenuItem>Pending Sales Returns</DropdownMenuItem>
              <DropdownMenuItem>Completed Sales Returns</DropdownMenuItem>
              <DropdownMenuItem>All Sales Returns</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="border-gray-300 text-gray-600"
          >
            More actions
          </Button>
        </div>
      </div>
      <div className="mb-4">
        <Input
          placeholder="Search sales returns..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="w-[3%]">
              <Checkbox />
            </TableHead>
            <TableHead>DATE</TableHead>
            <TableHead>RMA#</TableHead>
            <TableHead>SALES ORDER#</TableHead>
            <TableHead>CUSTOMER NAME</TableHead>
            <TableHead>STATUS</TableHead>
            <TableHead>RECEIVE STATUS</TableHead>
            <TableHead>REFUND STATUS</TableHead>
            <TableHead>RETURNED</TableHead>
            <TableHead className="w-[3%]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSalesReturns.map((salesReturn, index) => (
            <TableRow key={index}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>{salesReturn.date}</TableCell>
              <TableCell className="text-blue-600">{salesReturn.rmaNumber}</TableCell>
              <TableCell className="text-blue-600">{salesReturn.salesOrderNumber}</TableCell>
              <TableCell>{salesReturn.customerName}</TableCell>
              <TableCell>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  {salesReturn.status}
                </span>
              </TableCell>
              <TableCell>{salesReturn.receiveStatus}</TableCell>
              <TableCell>{salesReturn.refundStatus}</TableCell>
              <TableCell>{salesReturn.returned}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className='bg-slate-50'>
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PendingSalesReturnsTable;