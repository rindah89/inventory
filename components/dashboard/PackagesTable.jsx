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
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { MoreHorizontal, ChevronDown, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const PackagesTable = ({ packages }) => {
  const router = useRouter();

  const [filterBy, setFilterBy] = useState("All Packages");
  const [searchTerm, setSearchTerm] = useState("");

  const handleNewPackage = () => {
    router.push("/dashboard/sales/packages/new");
  };

  const filteredPackages = useMemo(() => {
    return (packages || []).filter(pkg => 
      pkg?.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg?.packageNumber?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [packages, searchTerm]);

  return (
    <div className="container mx-auto py-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-semibold">Packages</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="default"
            onClick={handleNewPackage}
            className="bg-blue-500 rounded hover:bg-blue-600 text-white"
          >
            <Plus className="mr-2 h-4 w-4" /> New
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="rounded border-slate-300">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-slate-50">
              <DropdownMenuItem>Import Packages</DropdownMenuItem>
              <DropdownMenuItem>Export Packages</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Preferences</DropdownMenuItem>
              <DropdownMenuItem>Refresh List</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Filter By :"
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
          className="max-w-xs border-slate-300 rounded hover:border-blue-300"
        />
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search packages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs border-slate-300 rounded hover:border-blue-300"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded border-slate-300 hover:border-blue-300">
                View: {filterBy} <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-slate-50">
              <DropdownMenuItem onSelect={() => setFilterBy("All Packages")}>All Packages</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setFilterBy("Not Shipped")}>Not Shipped</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setFilterBy("In Transit")}>In Transit</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setFilterBy("Delivered")}>Delivered</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="w-[3%]">
              <Checkbox />
            </TableHead>
            <TableHead className="w-[12%]">PACKAGE DATE</TableHead>
            <TableHead className="w-[10%]">PACKAGE#</TableHead>
            <TableHead className="w-[15%]">CARRIER</TableHead>
            <TableHead className="w-[10%]">TRACKING#</TableHead>
            <TableHead className="w-[10%]">SALES ORDER#</TableHead>
            <TableHead className="w-[10%]">STATUS</TableHead>
            <TableHead className="w-[12%]">SHIPMENT DATE</TableHead>
            <TableHead className="w-[15%]">CUSTOMER NAME</TableHead>
            <TableHead className="w-[3%] text-right">QUANTITY</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPackages.map((pkg) => (
            <TableRow key={pkg.packageNumber}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>{pkg.packageDate}</TableCell>
              <TableCell className="font-medium text-blue-600">
                {pkg.packageNumber}
              </TableCell>
              <TableCell>{pkg.carrier}</TableCell>
              <TableCell>{pkg.trackingNumber}</TableCell>
              <TableCell>{pkg.salesOrderNumber}</TableCell>
              <TableCell>
                <span className={`uppercase ${getStatusColor(pkg.status)}`}>
                  {pkg.status}
                </span>
              </TableCell>
              <TableCell>{pkg.shipmentDate}</TableCell>
              <TableCell>{pkg.customerName}</TableCell>
              <TableCell className="text-right">{pkg.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'not shipped':
      return 'text-red-600';
    case 'delivered':
      return 'text-green-600';
    default:
      return 'text-black';
  }
};

export default PackagesTable;