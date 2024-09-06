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
import { ChevronDown, Plus, RefreshCw } from "lucide-react";

const ReceivedPaymentsTable = ({ payments }) => {
  const [searchTerm, setSearchTerm] = useState("");

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
          <h1 className="text-xl font-semibold">All Received Payments</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-blue-600">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-white">
              <DropdownMenuItem>All Received Payments</DropdownMenuItem>
              <DropdownMenuItem>Unapplied Payments</DropdownMenuItem>
              <DropdownMenuItem>Advance Payments</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="default"
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            <Plus className="mr-2 h-4 w-4" /> New
          </Button>
          <Button variant="ghost" className="text-gray-600">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="mb-4">
        <Input
          placeholder="Search payments..."
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
            <TableHead>BRANCH</TableHead>
            <TableHead>PAYMENT #</TableHead>
            <TableHead>TYPE</TableHead>
            <TableHead>REFERENCE NUMBER</TableHead>
            <TableHead>CUSTOMER NAME</TableHead>
            <TableHead>INVOICE#</TableHead>
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
              <TableCell>{payment.branch}</TableCell>
              <TableCell className="text-blue-600">{payment.paymentNumber}</TableCell>
              <TableCell>{payment.type}</TableCell>
              <TableCell>{payment.referenceNumber}</TableCell>
              <TableCell>{payment.customerName}</TableCell>
              <TableCell>{payment.invoiceNumber}</TableCell>
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

export default ReceivedPaymentsTable;