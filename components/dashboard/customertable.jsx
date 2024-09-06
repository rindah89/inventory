'use client'

import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Checkbox } from "../ui/checkbox";
import { ArrowUpDown, Search, ChevronDown, X, MoreHorizontal } from 'lucide-react';
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu";
import { Input } from "../ui/input";

const customersData = [
  { id: 1, name: "Lawrence Kuhn", company: "nulla", email: "lawrence@example.com", phone: "123-456-7890", receivables: 874 },
  { id: 2, name: "Jeannie Schroeder II", company: "incidunt", email: "jeannie@example.com", phone: "098-765-4321", receivables: 721 },
  { id: 3, name: "Mona Anderson", company: "in", email: "mona@example.com", phone: "111-222-3333", receivables: 724 },
  { id: 4, name: "Foreign Currency Customer", company: "sunt", email: "foreign@example.com", phone: "444-555-6666", receivables: 397 },
];

const CustomerListTable = () => {
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [filterText, setFilterText] = useState('');

  const handleCustomerSelect = (customerId) => {
    setSelectedCustomers(prev => 
      prev.includes(customerId) 
        ? prev.filter(id => id !== customerId)
        : [...prev, customerId]
    );
  };

  const handleSelectAll = (checked) => {
    setSelectedCustomers(checked ? customersData.map(customer => customer.id) : []);
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const filteredCustomers = useMemo(() => {
    return customersData.filter(customer => 
      customer.name.toLowerCase().includes(filterText.toLowerCase()) ||
      customer.company.toLowerCase().includes(filterText.toLowerCase()) ||
      customer.email.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [filterText]);

  const sortedCustomers = useMemo(() => {
    let sortableCustomers = [...filteredCustomers];
    if (sortConfig.key !== null) {
      sortableCustomers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableCustomers;
  }, [filteredCustomers, sortConfig]);

  const SelectionHeader = () => (
    <div className="bg-blue-50 p-4 flex justify-between items-center mb-4">
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="primary" className="bg-blue-500 hover:bg-blue-600 text-white">
              New Transaction <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white">
            <DropdownMenuItem className="hover:bg-blue-100 transition-colors duration-200">Create Invoice</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-blue-100 transition-colors duration-200">Add Payment</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-blue-100 transition-colors duration-200">Send Statement</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <span className="ml-4 text-blue-700">{selectedCustomers.length} Customer(s) Selected</span>
      </div>
      <Button variant="ghost" onClick={() => setSelectedCustomers([])}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto py-10">
      {selectedCustomers.length > 0 && <SelectionHeader />}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">All Customers</h2>
        <div className="flex items-center space-x-2">
            <Button variant='blue'> New Customer</Button>
          <Input
            placeholder="Search customers..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="max-w-sm"
          />
          <Button size="sm">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[3%]">
              <Checkbox 
                checked={selectedCustomers.length === customersData.length}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead className="w-[25%]">
              NAME
              <Button variant="ghost" size="sm" className="ml-2" onClick={() => requestSort('name')}>
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="w-[20%]">
              COMPANY
              <Button variant="ghost" size="sm" className="ml-2" onClick={() => requestSort('company')}>
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="w-[20%]">EMAIL</TableHead>
            <TableHead className="w-[15%]">PHONE</TableHead>
            <TableHead className="w-[12%] text-right">
              RECEIVABLES
              <Button variant="ghost" size="sm" className="ml-2" onClick={() => requestSort('receivables')}>
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="w-[5%]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedCustomers.map((customer) => (
            <TableRow key={customer.id} className={selectedCustomers.includes(customer.id) ? "bg-blue-50" : ""}>
              <TableCell>
                <Checkbox 
                  checked={selectedCustomers.includes(customer.id)}
                  onCheckedChange={() => handleCustomerSelect(customer.id)}
                />
              </TableCell>
              <TableCell className="font-medium text-blue-600">{customer.name}</TableCell>
              <TableCell>{customer.company}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.phone}</TableCell>
              <TableCell className="text-right">${customer.receivables.toFixed(2)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomerListTable;