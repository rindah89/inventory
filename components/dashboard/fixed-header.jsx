'use client'

import React, { useState } from 'react';
import { PlusCircle, Grid, LayoutGrid, MoreVertical, HelpCircle, ArrowUpDown, Download, Settings, RefreshCw, ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const FixedHeader = () => {
  const [selectedOption, setSelectedOption] = useState('All');

  const filterOptions = [
    { label: 'All', group: 'DEFAULT FILTERS' },
    { label: 'Active', group: 'DEFAULT FILTERS' },
    { label: 'Inactive', group: 'DEFAULT FILTERS' },
    { label: 'Services', group: 'DEFAULT FILTERS' },
  ];

  return (
    <header className="sticky top-0 bg-white shadow-md z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center">
            <DropdownMenu >
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="font-semibold text-gray-700">
                  {selectedOption}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-slate-100">
                <DropdownMenuItem disabled className="font-semibold opacity-50">DEFAULT FILTERS</DropdownMenuItem>
                {filterOptions.map((option) => (
                  <DropdownMenuItem 
                    key={option.label}
                    onClick={() => setSelectedOption(option.label)}
                    className={`${
                      selectedOption === option.label 
                        ? 'bg-blue-500 text-white' 
                        : 'text-gray-700 hover:bg-blue-300'
                    } transition-colors`}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="primary" size="sm" className="bg-blue-500 rounded-lg hover:bg-blue-600 text-white">
              <PlusCircle className="mr-2 h-4 w-4 " />
              New
            </Button>
            <Button variant="ghost" size="icon">
              <Grid className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <ArrowUpDown className="mr-2 h-4 w-4 text-blue-500" />
                  <span>Sort by</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4 text-blue-500" />
                  <span>Import Items</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4 text-blue-500" />
                  <span>Export Items</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4 text-blue-500" />
                  <span>Export Current View</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4 text-blue-500" />
                  <span>Preferences</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <RefreshCw className="mr-2 h-4 w-4 text-blue-500" />
                  <span>Refresh List</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default FixedHeader;