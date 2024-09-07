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
import { ChevronDown, Plus, Search, AlertTriangle } from "lucide-react";

const filters = [
  { id: 'all', label: 'All' },
  { id: 'draft', label: 'Draft' },
  { id: 'pendingApproval', label: 'Pending Approval' },
  { id: 'open', label: 'Open' },
  { id: 'pending', label: 'Pending' },
  { id: 'overdue', label: 'Overdue' },
  { id: 'unpaid', label: 'Unpaid' },
  { id: 'partiallyPaid', label: 'Partially Paid' },
];

const OverdueBillsTable = ({ bills }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredBills = useMemo(() => {
    return bills.filter(bill =>
      Object.values(bill).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      ) && (activeFilter === 'all' || bill.status.toLowerCase() === activeFilter)
    );
  }, [bills, searchTerm, activeFilter]);

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
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-semibold">Overdue Bills</h1>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-blue-600">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="bg-white">
                <DropdownMenuItem>All Bills</DropdownMenuItem>
                <DropdownMenuItem>Overdue Bills</DropdownMenuItem>
                <DropdownMenuItem>Paid Bills</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex space-x-2">
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
              placeholder="Search bills..."
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
              <TableHead>BILL#</TableHead>
              <TableHead>REFERENCE NUMBER</TableHead>
              <TableHead>VENDOR NAME</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead>DUE DATE</TableHead>
              <TableHead className="text-right">AMOUNT</TableHead>
              <TableHead className="text-right">BALANCE DUE</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBills.map((bill, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>{bill.date}</TableCell>
                <TableCell className="text-blue-600">
                  {bill.billNumber}
                  {bill.hasWarning && <AlertTriangle className="inline-block ml-1 h-4 w-4 text-yellow-500" />}
                </TableCell>
                <TableCell>{bill.referenceNumber}</TableCell>
                <TableCell>{bill.vendorName}</TableCell>
                <TableCell className={`text-${getStatusColor(bill.status)}-600`}>
                  {bill.status.toUpperCase()}
                </TableCell>
                <TableCell>{bill.dueDate}</TableCell>
                <TableCell className="text-right">${bill.amount}</TableCell>
                <TableCell className="text-right">${bill.balanceDue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

function getStatusColor(status) {
  switch (status.toLowerCase()) {
    case 'overdue':
    case 'approval overdue':
      return 'red';
    case 'draft':
      return 'gray';
    case 'paid':
      return 'green';
    case 'pending approval':
      return 'orange';
    case 'open':
      return 'blue';
    default:
      return 'gray';
  }
}

export default OverdueBillsTable;