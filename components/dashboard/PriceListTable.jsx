'use client'

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Pagination } from "../ui/pagination";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { MoreVertical, Plus, Search, ArrowUpDown, Edit, Trash } from 'lucide-react';

const ITEMS_PER_PAGE = 10;

const priceListData = [
  { id: 0, name: 'PriceBook-0', description: 'blanditiis enim suscipit', currency: 'CFA', details: '96% Markdown', status: 'ACTIVE' },
  { id: 1, name: 'PriceBook-1', description: 'impedit commodi ipsa', currency: 'CFA', details: '86% Markdown', status: '' },
  { id: 2, name: 'PriceBook-2', description: 'cum sapiente dolorem', currency: 'CFA', details: '78% Markup', status: 'INACTIVE' },
  { id: 3, name: 'PriceBook-3', description: 'adipisci voluptate aliquam', currency: 'CFA', details: '82% Markup', status: '' },
  // Add more items to test pagination
  ...Array.from({ length: 20 }, (_, i) => ({
    id: i + 4,
    name: `PriceBook-${i + 4}`,
    description: `Description ${i + 4}`,
    currency: 'CFA',
    details: `${Math.floor(Math.random() * 100)}.0% ${Math.random() > 0.5 ? 'Markup' : 'Markdown'}`,
    status: Math.random() > 0.7 ? 'ACTIVE' : Math.random() > 0.5 ? 'INACTIVE' : '',
  })),
];

export const PriceListTable = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [filters, setFilters] = useState({ search: '', status: 'all' });

  const filteredData = useMemo(() => {
    return priceListData.filter(item => 
      (item.name.toLowerCase().includes(filters.search.toLowerCase()) || 
       item.description.toLowerCase().includes(filters.search.toLowerCase())) &&
      (filters.status === 'all' || item.status === filters.status)
    );
  }, [filters]);

  const sortedData = useMemo(() => {
    let sortableItems = [...filteredData];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedData, currentPage]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleEdit = (id) => {
    router.push(`/dashboard/inventory/price-lists/edit/${id}`);
  };

  const handleDelete = (id) => {
    // In a real application, you would call an API to delete the item
    console.log(`Deleting item with id: ${id}`);
  };

  const handleToggleStatus = (id, currentStatus) => {
    // In a real application, you would call an API to update the status
    console.log(`Toggling status for item ${id} from ${currentStatus} to ${currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'}`);
    // Update the item in the local state (you'd typically fetch fresh data from the server)
    // This is just a placeholder for demonstration
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All Price Lists</h1>
        <Button variant="default" onClick={() => router.push('/dashboard/inventory/price-lists/new')}>
          <Plus className="mr-2 h-4 w-4" /> New Price List
        </Button>
      </div>
      
      <div className="flex mb-4 space-x-2">
        <Input
          type="text"
          placeholder="Search..."
          className="max-w-sm rounded py-1 text-slate-500 "
          value={filters.search}
          onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
          icon={<Search className="h-4 w-4 text-gray-500" />}
        />
        <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
          <SelectTrigger className="w-[180px] rounded py-1 text-slate-500">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="bg-slate-100">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="INACTIVE">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">
              <Button variant="ghost" onClick={() => requestSort('name')}>
                NAME AND DESCRIPTION
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>CURRENCY</TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => requestSort('details')}>
                DETAILS
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>PRICING SCHEME</TableHead>
            <TableHead>ROUND OFF PREFERENCE</TableHead>
            <TableHead className="w-[100px]">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <div>
                  <span className="font-medium text-blue-600">{item.name}</span>
                  {item.status && (
                    <Badge asChild variant={item.status === 'ACTIVE' ? 'default' : 'secondary'} className="ml-2">
                      {item.status}
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-gray-500">{item.description}</div>
              </TableCell>
              <TableCell>{item.currency}</TableCell>
              <TableCell>{item.details}</TableCell>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="ghost" className='text-blue-500' size="icon" onClick={() => handleEdit(item.id)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-blue-500"
                    onClick={() => handleToggleStatus(item.id, item.status)}
                  >
                    {item.status === 'ACTIVE' ? 'Mark as Inactive' : 'Mark as Active'}
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost"                     className="text-blue-500"
 size="icon">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you sure you want to delete this item?</DialogTitle>
                      </DialogHeader>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => {}}>Cancel</Button>
                        <Button variant="destructive" onClick={() => handleDelete(item.id)}>Delete</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-4 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(sortedData.length / ITEMS_PER_PAGE)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default PriceListTable;