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
import { ChevronDown, Plus, Search } from "lucide-react";

const InTransitReceivesTable = ({ receives }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredReceives = useMemo(() => {
    return receives.filter(receive =>
      Object.values(receive).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      ) && (filter === "All" || receive.status === filter)
    );
  }, [receives, searchTerm, filter]);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Received':
        return 'text-green-600';
      case 'Billed':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="container mx-auto py-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-semibold">In Transit</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-gray-300">
                {filter} <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-white">
              <DropdownMenuItem onSelect={() => setFilter("All")}>All</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setFilter("In Transit")}>In Transit</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setFilter("Received")}>Received</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button
          variant="default"
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          <Plus className="mr-2 h-4 w-4" /> New
        </Button>
      </div>
      <div className="mb-4">
        <div className="relative">
          <Input
            placeholder="Search receives..."
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
            <TableHead>PURCHASE RECEIVE#</TableHead>
            <TableHead>PURCHASE ORDER#</TableHead>
            <TableHead>VENDOR NAME</TableHead>
            <TableHead>STATUS</TableHead>
            <TableHead className="text-right">QUANTITY</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredReceives.map((receive, index) => (
            <TableRow key={index}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>{receive.date}</TableCell>
              <TableCell className="text-blue-600">{receive.purchaseReceiveNumber}</TableCell>
              <TableCell className="text-blue-600">{receive.purchaseOrderNumber}</TableCell>
              <TableCell>{receive.vendorName}</TableCell>
              <TableCell className={getStatusStyle(receive.status)}>
                {receive.status}
              </TableCell>
              <TableCell className="text-right">{receive.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default InTransitReceivesTable;