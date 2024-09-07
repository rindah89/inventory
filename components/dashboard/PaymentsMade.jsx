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
import { ChevronDown, Plus, Search, RotateCw } from "lucide-react";

const AllPaymentsTable = ({ payments }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All Payments");

  const filteredPayments = useMemo(() => {
    return payments.filter(payment =>
      Object.values(payment).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [payments, searchTerm]);

  return (
    <div className="container mx-auto py-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-semibold">All Payments</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-blue-500 text-white">
                {filter} <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-white">
              <DropdownMenuItem onSelect={() => setFilter("All Payments")}>All Payments</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setFilter("To Be Printed Checks")}>To Be Printed Checks</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="border-gray-300"
          >
            <RotateCw className="mr-2 h-4 w-4" />
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
            placeholder="Search payments..."
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
            <TableHead>PAYMENT #</TableHead>
            <TableHead>REFERENCE#</TableHead>
            <TableHead>VENDOR NAME</TableHead>
            <TableHead>BILL#</TableHead>
            <TableHead>MODE</TableHead>
            <TableHead className="text-right">AMOUNT</TableHead>
            <TableHead className="text-right">UNUSED AMOUNT</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPayments.map((payment, index) => (
            <TableRow key={index}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>{payment.date}</TableCell>
              <TableCell className="text-blue-600">{payment.paymentNumber}</TableCell>
              <TableCell>
                {payment.hasAttachment && (
                  <span className="mr-1">📎</span>
                )}
                {payment.referenceNumber}
              </TableCell>
              <TableCell>{payment.vendorName}</TableCell>
              <TableCell>{payment.billNumber}</TableCell>
              <TableCell>{payment.mode}</TableCell>
              <TableCell className="text-right">${payment.amount}</TableCell>
              <TableCell className="text-right">${payment.unusedAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllPaymentsTable;