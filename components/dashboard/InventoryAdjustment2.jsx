'use client'

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { PlusIcon, MoreVerticalIcon, HelpCircleIcon, FileEditIcon, ChevronUpIcon, ChevronDownIcon } from 'lucide-react';
import { Pagination } from "../ui/pagination";
import { Alert, AlertDescription } from "../ui/alert";

const InventoryAdjustments2 = () => {
  const router = useRouter();
  const [typeFilter, setTypeFilter] = useState('all');
  const [periodFilter, setPeriodFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ column: 'date', direction: 'desc' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const itemsPerPage = 10;

  // Mock data - in a real application, this would come from an API
  const adjustments = useMemo(() => [
    { date: '24 Jul 2024', status: 'ADJUSTED', referenceNumber: 'ADJ-0', type: 'value', createdBy: 'demouser', createdTime: '2024-07-24T10:00:00', lastModifiedBy: '', lastModifiedTime: '' },
    { date: '24 Jul 2024', status: 'ADJUSTED', referenceNumber: 'ADJ-1', type: 'quantity', createdBy: 'demouser', createdTime: '2024-07-24T11:00:00', lastModifiedBy: '', lastModifiedTime: '' },
    { date: '24 Jul 2024', status: 'ADJUSTED', referenceNumber: 'ADJ-2', type: 'value', createdBy: 'demouser', createdTime: '2024-07-24T12:00:00', lastModifiedBy: '', lastModifiedTime: '' },
    // Add more mock data here to test pagination
  ], []);

  const filterAdjustments = useCallback((adjustments, typeFilter, periodFilter) => {
    return adjustments.filter(adjustment => {
      const typeMatch = typeFilter === 'all' || adjustment.type === typeFilter;
      let periodMatch = true;

      if (periodFilter !== 'all') {
        const adjustmentDate = new Date(adjustment.createdTime);
        const now = new Date();
        switch (periodFilter) {
          case 'today':
            periodMatch = adjustmentDate.toDateString() === now.toDateString();
            break;
          case 'thisWeek':
            const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
            periodMatch = adjustmentDate >= weekStart;
            break;
          case 'thisMonth':
            periodMatch = adjustmentDate.getMonth() === now.getMonth() && adjustmentDate.getFullYear() === now.getFullYear();
            break;
          case 'thisQuarter':
            const quarterStart = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
            periodMatch = adjustmentDate >= quarterStart;
            break;
          case 'thisYear':
            periodMatch = adjustmentDate.getFullYear() === now.getFullYear();
            break;
        }
      }

      return typeMatch && periodMatch;
    });
  }, []);

  const sortAdjustments = useCallback((adjustments, { column, direction }) => {
    return [...adjustments].sort((a, b) => {
      if (a[column] < b[column]) return direction === 'asc' ? -1 : 1;
      if (a[column] > b[column]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, []);

  const filteredAndSortedAdjustments = useMemo(() => {
    let result = filterAdjustments(adjustments, typeFilter, periodFilter);
    return sortAdjustments(result, sortConfig);
  }, [adjustments, filterAdjustments, sortAdjustments, typeFilter, periodFilter, sortConfig]);

  const paginatedAdjustments = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedAdjustments.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedAdjustments, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedAdjustments.length / itemsPerPage);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    // Simulate API call
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [typeFilter, periodFilter, sortConfig]);

  const handleNewClick = () => {
    router.push('/inventory/new');
  };

  const handleSort = useCallback((column) => {
    setSortConfig(current => ({
      column,
      direction: current.column === column && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  }, []);

  const renderSortIcon = useCallback((column) => {
    if (sortConfig.column !== column) return null;
    return sortConfig.direction === 'asc' ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />;
  }, [sortConfig]);

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Inventory Adjustments</h1>
        <div className="flex gap-2">
          <Button variant="default" onClick={handleNewClick}>
            <PlusIcon className="mr-2 h-4 w-4" /> New
          </Button>
          <Button variant="ghost"><MoreVerticalIcon className="h-4 w-4" /></Button>
          <Button variant="ghost"><HelpCircleIcon className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px] py-1 rounded border-slate-300 text-slate-500">
              <SelectValue placeholder="Type: All" />
            </SelectTrigger>
            <SelectContent className='bg-slate-50'>
              <SelectItem value="all">Type: All</SelectItem>
              <SelectItem value="value">By Value</SelectItem>
              <SelectItem value="quantity">By Quantity</SelectItem>
            </SelectContent>
          </Select>
          <Select value={periodFilter} onValueChange={setPeriodFilter}>
          <SelectTrigger className="w-[180px] py-1 rounded border-slate-300 text-slate-500">
          <SelectValue placeholder="Period: All" />
            </SelectTrigger>
            <SelectContent className='bg-slate-50'>
              <SelectItem value="all">Period: All</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="thisWeek">This Week</SelectItem>
              <SelectItem value="thisMonth">This Month</SelectItem>
              <SelectItem value="thisQuarter">This Quarter</SelectItem>
              <SelectItem value="thisYear">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="link" className="text-blue-600">FIFO Cost Lot Tracking Report</Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-5 h-5"><Input type="checkbox" /></TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('date')}>
                  DATE {renderSortIcon('date')}
                </TableHead>
                <TableHead>DESCRIPTION</TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('status')}>
                  STATUS {renderSortIcon('status')}
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('referenceNumber')}>
                  REFERENCE NUMBER {renderSortIcon('referenceNumber')}
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('type')}>
                  TYPE {renderSortIcon('type')}
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('createdBy')}>
                  CREATED BY {renderSortIcon('createdBy')}
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('createdTime')}>
                  CREATED TIME {renderSortIcon('createdTime')}
                </TableHead>
                <TableHead>LAST MODIFIED BY</TableHead>
                <TableHead>LAST MODIFIED TIME</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedAdjustments.map((adjustment, index) => (
                <TableRow key={index}>
                  <TableCell><Input type="checkbox" /></TableCell>
                  <TableCell>{adjustment.date}</TableCell>
                  <TableCell><FileEditIcon className="h-4 w-4" /></TableCell>
                  <TableCell className="text-blue-600">{adjustment.status}</TableCell>
                  <TableCell>{adjustment.referenceNumber}</TableCell>
                  <TableCell>{adjustment.type}</TableCell>
                  <TableCell>{adjustment.createdBy}</TableCell>
                  <TableCell>{adjustment.createdTime}</TableCell>
                  <TableCell>{adjustment.lastModifiedBy}</TableCell>
                  <TableCell>{adjustment.lastModifiedTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default InventoryAdjustments2;