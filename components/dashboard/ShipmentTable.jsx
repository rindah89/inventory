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

const ShipmentsTable = ({ shipments }) => {
  const router = useRouter();

  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const handleNewShipment = () => {
    router.push("/dashboard/sales/shipments/new");
  };

  const filteredShipments = useMemo(() => {
    return (shipments || []).filter(shipment => 
      (statusFilter === "All" || shipment.status === statusFilter) &&
      (typeFilter === "All" || shipment.type === typeFilter) &&
      (shipment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
       shipment.shipmentOrder.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [shipments, statusFilter, typeFilter, searchTerm]);

  return (
    <div className="container mx-auto py-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-semibold">Shipments</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="default"
            onClick={handleNewShipment}
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
              <DropdownMenuItem>Import Shipments</DropdownMenuItem>
              <DropdownMenuItem>Export Shipments</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Preferences</DropdownMenuItem>
              <DropdownMenuItem>Refresh List</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <span>Filter By :</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded border-slate-300 hover:border-blue-300">
                Status: {statusFilter} <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-slate-50">
              <DropdownMenuItem onSelect={() => setStatusFilter("All")}>All</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setStatusFilter("Delivered")}>Delivered</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setStatusFilter("In Transit")}>In Transit</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setStatusFilter("Pending")}>Pending</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded border-slate-300 hover:border-blue-300">
                Type: {typeFilter} <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-slate-50">
              <DropdownMenuItem onSelect={() => setTypeFilter("All")}>All</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setTypeFilter("Standard")}>Standard</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setTypeFilter("Express")}>Express</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Input
          placeholder="Search shipments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs border-slate-300 rounded hover:border-blue-300"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="w-[3%]">
              <Checkbox />
            </TableHead>
            <TableHead className="w-[10%]">DATE</TableHead>
            <TableHead className="w-[12%]">SHIPMENT ORDER#</TableHead>
            <TableHead className="w-[15%]">CUSTOMER NAME</TableHead>
            <TableHead className="w-[10%]">SALES ORDER#</TableHead>
            <TableHead className="w-[10%]">PACKAGE#</TableHead>
            <TableHead className="w-[10%]">CARRIER</TableHead>
            <TableHead className="w-[10%]">TRACKING#</TableHead>
            <TableHead className="w-[10%]">STATUS</TableHead>
            <TableHead className="w-[10%] text-right">SHIPPING RATE</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredShipments.map((shipment) => (
            <TableRow key={shipment.shipmentOrder}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>{shipment.date}</TableCell>
              <TableCell className="font-medium text-blue-600">
                {shipment.shipmentOrder}
              </TableCell>
              <TableCell>{shipment.customerName}</TableCell>
              <TableCell>{shipment.salesOrder}</TableCell>
              <TableCell>{shipment.package}</TableCell>
              <TableCell>{shipment.carrier}</TableCell>
              <TableCell>{shipment.tracking}</TableCell>
              <TableCell>
                <span className={`uppercase ${getStatusColor(shipment.status)}`}>
                  {shipment.status}
                </span>
              </TableCell>
              <TableCell className="text-right">{shipment.shippingRate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'delivered':
      return 'text-green-600';
    case 'in transit':
      return 'text-blue-600';
    case 'pending':
      return 'text-yellow-600';
    default:
      return 'text-black';
  }
};

export default ShipmentsTable;