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

const AllVendorsTable = ({ vendors }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVendors = useMemo(() => {
    return vendors.filter(vendor =>
      Object.values(vendor).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [vendors, searchTerm]);

  return (
    <div className="container mx-auto py-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-semibold">All Vendors</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-blue-600">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-white">
              <DropdownMenuItem>All Vendors</DropdownMenuItem>
              <DropdownMenuItem>Active Vendors</DropdownMenuItem>
              <DropdownMenuItem>Inactive Vendors</DropdownMenuItem>
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
            placeholder="Search vendors..."
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
            <TableHead>NAME</TableHead>
            <TableHead>COMPANY NAME</TableHead>
            <TableHead>EMAIL</TableHead>
            <TableHead>WORK PHONE</TableHead>
            <TableHead className="text-right">PAYABLES</TableHead>
            <TableHead className="text-right">UNUSED CREDITS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredVendors.map((vendor, index) => (
            <TableRow key={index}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell className="text-blue-600">{vendor.name}</TableCell>
              <TableCell>{vendor.companyName}</TableCell>
              <TableCell>{vendor.email}</TableCell>
              <TableCell>{vendor.workPhone}</TableCell>
              <TableCell className="text-right">${vendor.payables}</TableCell>
              <TableCell className="text-right">${vendor.unusedCredits}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllVendorsTable;