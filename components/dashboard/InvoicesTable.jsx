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
import { MoreHorizontal, ChevronDown, Plus, FileText, Eye, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

const InvoicesTable = ({ invoices }) => {
  const router = useRouter();

  const [statusFilter, setStatusFilter] = useState("All Invoices");
  const [searchTerm, setSearchTerm] = useState("");

  const handleNewInvoice = () => {
    router.push("/dashboard/sales/invoices/new");
  };

  const filteredInvoices = useMemo(() => {
    return (invoices || []).filter(invoice => 
      (statusFilter === "All Invoices" || invoice.status === statusFilter) &&
      (invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
       invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [invoices, statusFilter, searchTerm]);

  const getInvoiceIcon = (invoiceNumber) => {
    switch (invoiceNumber.slice(-1)) {
      case '':
        return <FileText className="h-4 w-4 text-gray-500" />;
      case '':
        return <Eye className="h-4 w-4 text-blue-500" />;
      case '':
        return <Mail className="h-4 w-4 text-green-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="container mx-auto py-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-semibold">Invoices</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-blue-600">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-slate-50">
              <DropdownMenuItem onSelect={() => setStatusFilter("All Invoices")}>All Invoices</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setStatusFilter("Draft")}>Draft</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setStatusFilter("Pending Approval")}>Pending Approval</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setStatusFilter("Approved")}>Approved</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setStatusFilter("Partially Paid")}>Partially Paid</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setStatusFilter("Paid")}>Paid</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setStatusFilter("Overdue")}>Overdue</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="default"
            onClick={handleNewInvoice}
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
              <DropdownMenuItem>Import Invoices</DropdownMenuItem>
              <DropdownMenuItem>Export Invoices</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Preferences</DropdownMenuItem>
              <DropdownMenuItem>Refresh List</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="mb-4">
        <Input
          placeholder="Search invoices..."
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
            <TableHead className="w-[10%]">INVOICE#</TableHead>
            <TableHead className="w-[10%]">ORDER NUMBER</TableHead>
            <TableHead className="w-[20%]">CUSTOMER NAME</TableHead>
            <TableHead className="w-[10%]">STATUS</TableHead>
            <TableHead className="w-[10%]">DUE DATE</TableHead>
            <TableHead className="w-[10%] text-right">AMOUNT</TableHead>
            <TableHead className="w-[10%] text-right">BALANCE DUE</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInvoices.map((invoice) => (
            <TableRow key={invoice.invoiceNumber}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>{invoice.date}</TableCell>
              <TableCell className="font-medium text-blue-600 flex items-center">
                {getInvoiceIcon(invoice.invoiceNumber)}
                <span className="ml-1">{invoice.invoiceNumber}</span>
              </TableCell>
              <TableCell>{invoice.orderNumber}</TableCell>
              <TableCell>{invoice.customerName}</TableCell>
              <TableCell>
                <span className={`uppercase ${getStatusColor(invoice.status)}`}>
                  {invoice.status}
                </span>
              </TableCell>
              <TableCell>{invoice.dueDate}</TableCell>
              <TableCell className="text-right"> CFA {invoice.amount}</TableCell>
              <TableCell className="text-right"> CFA {invoice.balanceDue}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'draft':
      return 'text-gray-600';
    case 'partially paid':
      return 'text-green-600';
    case 'open':
      return 'text-blue-600';
    case 'paid':
      return 'text-green-600';
    case 'overdue':
      return 'text-red-600';
    case 'approved':
      return 'text-purple-600';
    case 'pending approval':
      return 'text-orange-600';
    default:
      return 'text-black';
  }
};

export default InvoicesTable;