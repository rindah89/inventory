"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

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
import { ChevronDown, Plus, MoreHorizontal } from "lucide-react";

const RetainerInvoicesTable = ({ invoices }) => {
    const router = useRouter();

  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "descending",
  });
  const [filterText, setFilterText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const handleInvoiceSelect = (invoiceId) => {
    setSelectedInvoices((prev) =>
      prev.includes(invoiceId)
        ? prev.filter((id) => id !== invoiceId)
        : [...prev, invoiceId]
    );
  };

  const handleSelectAll = (checked) => {
    setSelectedInvoices(checked ? invoices.map((invoice) => invoice.id) : []);
  };

  const handleNewInvoice = () => {
    router.push("/dashboard/sales/retainerInvoices/new");
  };
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const filteredInvoices = useMemo(() => {
    return invoices.filter(
      (invoice) =>
        (invoice.customerName
          .toLowerCase()
          .includes(filterText.toLowerCase()) ||
          invoice.retainerInvoiceNumber
            .toLowerCase()
            .includes(filterText.toLowerCase())) &&
        (statusFilter === "All" || invoice.status === statusFilter)
    );
  }, [invoices, filterText, statusFilter]);

  const sortedInvoices = useMemo(() => {
    let sortableInvoices = [...filteredInvoices];
    if (sortConfig.key !== null) {
      sortableInvoices.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableInvoices;
  }, [filteredInvoices, sortConfig]);

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">All Retainer Invoices</h1>
        <div className="flex items-center space-x-2">
          <Button
            variant="default"
            onClick={handleNewInvoice}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            <Plus className="mr-2 h-4 w-4" /> New
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className=" rounded border-slate-300">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-slate-50 ">
              <DropdownMenuItem>Import Retainer Invoices</DropdownMenuItem>
              <DropdownMenuItem>Export Retainer Invoices</DropdownMenuItem>
              <DropdownMenuItem>Export Current View</DropdownMenuItem>
              <DropdownMenuItem>Preferences</DropdownMenuItem>
              <DropdownMenuItem>Manage Custom Fields</DropdownMenuItem>
              <DropdownMenuItem>Refresh List</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="text-gray-600 rounded border-slate-300"
            >
              DEFAULT FILTERS <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-slate-50">
            <DropdownMenuItem onSelect={() => setStatusFilter("All")}>
              All
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => setStatusFilter("Pending Approval")}
            >
              Pending Approval
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setStatusFilter("Approved")}>
              Approved
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setStatusFilter("Draft")}>
              Draft
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setStatusFilter("Sent")}>
              Sent
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setStatusFilter("Paid")}>
              Paid
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => setStatusFilter("Partially Drawn")}
            >
              Partially Drawn
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setStatusFilter("Drawn")}>
              Drawn
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setStatusFilter("Void")}>
              Void
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Input
          placeholder="Search invoices..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="max-w-sm border-slate-200 rounded"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[3%]">
              <Checkbox
                checked={selectedInvoices.length === invoices.length}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead className="w-[15%]">DATE</TableHead>
            <TableHead className="w-[20%]">RETAINER INVOICE NUMBER</TableHead>
            <TableHead className="w-[15%]">REFERENCE#</TableHead>
            <TableHead className="w-[20%]">CUSTOMER NAME</TableHead>
            <TableHead className="w-[10%]">PROJECT/ESTIMATE</TableHead>
            <TableHead className="w-[7%]">STATUS</TableHead>
            <TableHead className="w-[10%] text-right">AMOUNT</TableHead>
            <TableHead className="w-[10%] text-right">BALANCE</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedInvoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>
                <Checkbox
                  checked={selectedInvoices.includes(invoice.id)}
                  onCheckedChange={() => handleInvoiceSelect(invoice.id)}
                />
              </TableCell>
              <TableCell>{invoice.date}</TableCell>
              <TableCell className="font-medium text-blue-600">
                {invoice.retainerInvoiceNumber}
              </TableCell>
              <TableCell>{invoice.reference}</TableCell>
              <TableCell>{invoice.customerName}</TableCell>
              <TableCell>{invoice.projectEstimate}</TableCell>
              <TableCell className="uppercase text-blue-600">
                {invoice.status}
              </TableCell>
              <TableCell className="text-right">
                ${invoice.amount.toFixed(2)}
              </TableCell>
              <TableCell className="text-right">
                ${invoice.balance.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RetainerInvoicesTable;
