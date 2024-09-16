import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../components/ui/table";
import { Button } from "../../../../components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "../../../../components/ui/dropdown-menu";
import { ArrowUpDown, Search, MoreHorizontal } from 'lucide-react';
import { prisma } from "../../../lib/db";


async function getData() {
  const itemsData = await prisma.item.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return itemsData;
}

export default async function ItemsTable() {
  const itemsData = await getData();

  return (
    <div className="container mx-auto py-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[15%]">IMAGE</TableHead>
            <TableHead className="w-[15%]">
              NAME
              <Button variant="ghost" size="sm" className="ml-2">
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="w-[15%]">SKU</TableHead>
            <TableHead className="w-[15%]">TYPE</TableHead>
            <TableHead className="w-[15%]">DESCRIPTION</TableHead>
            <TableHead className="w-[15%]">PRICE</TableHead>
            <TableHead className="text-end"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {itemsData.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                {item.images && item.images.length > 0 ? (
                  <Image 
                    src={item.images[0]} 
                    alt={item.name} 
                    width={50} 
                    height={50} 
                    className="object-cover rounded"
                  />
                ) : (
                  <div className="w-[50px] h-[50px] bg-gray-200 rounded"></div>
                )}
              </TableCell>
              <TableCell className="font-medium text-blue-600">{item.name}</TableCell>
              <TableCell className="text-green-600">{item.sku || 'N/A'}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell className="text-gray-500">{item.salesDescription || 'No description'}</TableCell>
              <TableCell >{item.sellingPrice ? `CFA ${item.sellingPrice}` : 'N/A'}</TableCell>
              <TableCell className="text-end">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <MoreHorizontal className='h-4 w-4'/>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='bg-slate-50'>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/inventory/items/${item.id}`}>Edit</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}