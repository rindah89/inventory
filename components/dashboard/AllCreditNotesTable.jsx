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

const AllCreditNotesTable = ({ creditNotes }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCreditNotes = useMemo(() => {
    return creditNotes.filter(creditNote =>
      Object.values(creditNote).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [creditNotes, searchTerm]);

  return (
    <div className="container mx-auto py-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-semibold">All Credit Notes</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-blue-600">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-white">
              <DropdownMenuItem>All Credit Notes</DropdownMenuItem>
              <DropdownMenuItem>Open Credit Notes</DropdownMenuItem>
              <DropdownMenuItem>Closed Credit Notes</DropdownMenuItem>
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
            placeholder="Search credit notes..."
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
            <TableHead>CUSTOMER NAME</TableHead>
            <TableHead>INVOICE#</TableHead>
            <TableHead>STATUS</TableHead>
            <TableHead className="text-right">AMOUNT</TableHead>
            <TableHead className="text-right">BALANCE</TableHead>
            <TableHead className="w-[3%]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCreditNotes.map((creditNote, index) => (
            <TableRow key={index}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>{creditNote.date}</TableCell>
              <TableCell className="text-blue-600">{creditNote.creditNoteNumber}</TableCell>
              <TableCell>{creditNote.referenceNumber}</TableCell>
              <TableCell>{creditNote.customerName}</TableCell>
              <TableCell className="text-blue-600">{creditNote.invoiceNumber}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-medium
                  ${creditNote.status === 'OPEN' ? 'bg-blue-100 text-blue-800' :
                    creditNote.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                    creditNote.status === 'CLOSED' ? 'bg-gray-100 text-gray-800' :
                    'bg-orange-100 text-orange-800'}`}>
                  {creditNote.status}
                </span>
              </TableCell>
              <TableCell className="text-right">${creditNote.amount}</TableCell>
              <TableCell className="text-right">${creditNote.balance}</TableCell>
              <TableCell>
                {creditNote.hasAttachment && (
                  <span className="text-gray-400">📎</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllCreditNotesTable;