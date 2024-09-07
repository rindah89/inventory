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

const filters = [
  { id: 'all', label: 'All' },
  { id: 'draft', label: 'Draft' },
  { id: 'pendingApproval', label: 'Pending Approval' },
  { id: 'open', label: 'Open' },
  { id: 'closed', label: 'Closed' },
  { id: 'void', label: 'Void' },
];

const AllVendorCreditsTable = ({ vendorCredits }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredVendorCredits = useMemo(() => {
    return vendorCredits.filter(credit =>
      Object.values(credit).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      ) && (activeFilter === 'all' || credit.status.toLowerCase() === activeFilter)
    );
  }, [vendorCredits, searchTerm, activeFilter]);

  const getStatusStyle = (status) => {
    switch (status.toUpperCase()) {
      case 'VOID':
        return 'text-gray-600';
      case 'CLOSED':
        return 'text-green-600';
      case 'DRAFT':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="flex">
      {/* Filter Sidebar */}
      <div className="w-64 bg-gray-100 p-4">
        <h2 className="text-lg font-semibold mb-2">DEFAULT FILTERS</h2>
        <ul>
          {filters.map((filter) => (
            <li key={filter.id} className="mb-2">
              <button
                className={`w-full text-left p-2 rounded ${
                  activeFilter === filter.id ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                }`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            </li>
          ))}
        </ul>
        <h2 className="text-lg font-semibold mt-4 mb-2">CREATED BY ME</h2>
        {/* Add "Created by me" filter options here if needed */}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-semibold">All Vendor Credits</h1>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-blue-600">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="bg-white">
                <DropdownMenuItem>All Vendor Credits</DropdownMenuItem>
                <DropdownMenuItem>Open Vendor Credits</DropdownMenuItem>
                <DropdownMenuItem>Closed Vendor Credits</DropdownMenuItem>
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
              placeholder="Search vendor credits..."
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
              <TableHead>CREDIT NOTE#</TableHead>
              <TableHead>REFERENCE NUMBER</TableHead>
              <TableHead>VENDOR NAME</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead className="text-right">AMOUNT</TableHead>
              <TableHead className="text-right">BALANCE</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVendorCredits.map((credit, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>{credit.date}</TableCell>
                <TableCell className="text-blue-600">{credit.creditNoteNumber}</TableCell>
                <TableCell>{credit.referenceNumber}</TableCell>
                <TableCell>{credit.vendorName}</TableCell>
                <TableCell className={getStatusStyle(credit.status)}>
                  {credit.status.toUpperCase()}
                </TableCell>
                <TableCell className="text-right">${credit.amount}</TableCell>
                <TableCell className="text-right">${credit.balance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AllVendorCreditsTable;