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


const SalesOrdersTable = ({ orders }) => {

    const router = useRouter();

    const handleNewSalesOrder = () => {
        router.push("/dashboard/sales/salesOrders/new");
      };
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Created Time");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = useMemo(() => {
    return (orders || []).filter(order => 
      (statusFilter === "All" || order?.status === statusFilter) &&
      (order?.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       order?.salesOrder?.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [orders, statusFilter, searchTerm]);

  const sortedOrders = useMemo(() => {
    return [...filteredOrders].sort((a, b) => {
      switch (sortBy) {
        case "Date":
          return new Date(b.date) - new Date(a.date);
        case "Sales Order#":
          return a.salesOrder.localeCompare(b.salesOrder);
        case "CustomerName":
          return a.customerName.localeCompare(b.customerName);
        case "Amount":
          return b.amount - a.amount;
        default:
          return 0;
      }
    });
  }, [filteredOrders, sortBy]);

  return (
    <div className="container mx-auto py-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-semibold">All Sales Orders</h1>
          <Button variant="ghost" className="text-blue-600">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="default"
            onClick={handleNewSalesOrder}

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
            <DropdownMenuContent align="end" className='bg-slate-50'>
              <DropdownMenuItem>Import Sales Orders</DropdownMenuItem>
              <DropdownMenuItem>Export Sales Orders</DropdownMenuItem>
              <DropdownMenuItem>Export Current View</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Preferences</DropdownMenuItem>
              <DropdownMenuItem>Refresh List</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="text-gray-600 rounded hover:border-blue-300 border-slate-300">
              DEFAULT FILTERS <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='bg-slate-50'>
            <DropdownMenuItem onSelect={() => setStatusFilter("All")}>All</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setStatusFilter("Draft")}>Draft</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setStatusFilter("PendingApproval")}>Pending Approval</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setStatusFilter("Approved")}>Approved</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setStatusFilter("Open")}>Open</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setStatusFilter("Overdue")}>Overdue</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setStatusFilter("PartiallyInvoiced")}>Partially Invoiced</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setStatusFilter("Invoiced")}>Invoiced</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setStatusFilter("Closed")}>Closed</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs border-slate-300 rounded hover:border-blue-300"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className='rounded border-slate-300 hover:border-blue-300'>
                Sort by: {sortBy} <ChevronDown className="ml-2 h-4 w-4 rounded " />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='bg-slate-50'>
              <DropdownMenuItem onSelect={() => setSortBy("Created Time")}>Created Time</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setSortBy("Date")}>Date</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setSortBy("Sales Order#")}>Sales Order#</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setSortBy("CustomerName")}>CustomerName</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setSortBy("Amount")}>Amount</DropdownMenuItem>
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
            <TableHead className="w-[12%]">DATE</TableHead>
            <TableHead className="w-[15%]">SALES ORDER#</TableHead>
            <TableHead className="w-[15%]">REFERENCE#</TableHead>
            <TableHead className="w-[20%]">CUSTOMER NAME</TableHead>
            <TableHead className="w-[10%]">STATUS</TableHead>
            <TableHead className="w-[10%] text-right">AMOUNT</TableHead>
            <TableHead className="w-[7%] text-center">INVOICED</TableHead>
            <TableHead className="w-[8%] text-center">PAYMENT</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell className="font-medium text-blue-600">
                {order.salesOrder}
              </TableCell>
              <TableCell>{order.reference}</TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>
                <span className={`uppercase ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </TableCell>
              <TableCell className="text-right">${order.amount}</TableCell>
              <TableCell className="text-center">
                {order.invoiced ? "✓" : "-"}
              </TableCell>
              <TableCell className="text-center">
                <span className="text-green-500">⬤</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'overdue':
      return 'text-red-600';
    case 'draft':
      return 'text-gray-600';
    case 'approved':
      return 'text-green-600';
    default:
      return 'text-black';
  }
};

export default SalesOrdersTable;