'use client'

import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card, CardHeader, CardTitle, CardContent } from "../../../../../../components/ui/card";
import { Button } from "../../../../../../components/ui/button";
import { Checkbox } from "../../../../../../components/ui/checkbox";
import { Plus, LayoutGrid, List } from "lucide-react";

const PackageItem = ({ item, index }) => (
  <Draggable draggableId={item.id} index={index}>
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className="flex items-center justify-between py-2 border-b last:border-b-0 bg-white rounded-md shadow-sm mb-2 p-3"
      >
        <div className="flex items-center space-x-4">
          <Checkbox id={item.id} />
          <div>
            <p className="font-semibold">{item.name}</p>
            <p className="text-sm text-gray-500">
              {item.packageId} {item.orderId}
            </p>
            <p className="text-sm text-gray-500">
              {item.courier && `${item.courier} • `}{item.date}
            </p>
          </div>
        </div>
        <p className="font-semibold">{item.cost}</p>
      </div>
    )}
  </Draggable>
);

const PackageList = ({ title, color, items, id }) => (
  <Card className={`flex-1 ${color}`}>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Button variant="ghost" size="sm">
        <List className="h-4 w-4" />
      </Button>
    </CardHeader>
    <Droppable droppableId={id}>
      {(provided) => (
        <CardContent
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="min-h-[200px]"
        >
          {items.length > 0 ? (
            items.map((item, index) => (
              <PackageItem key={item.id} item={item} index={index} />
            ))
          ) : (
            <p className="text-center text-gray-500 py-4">No Records Found</p>
          )}
          {provided.placeholder}
        </CardContent>
      )}
    </Droppable>
  </Card>
);

const KanbanBoard = ({ initialPackages }) => {
  const [packages, setPackages] = useState(initialPackages);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceColumn = packages[source.droppableId];
    const destColumn = packages[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = source.droppableId === destination.droppableId ? sourceItems : [...destColumn.items];
    
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);

    setPackages({
      ...packages,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All Packages</h1>
        <div className="space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New
          </Button>
          <Button variant="outline" size="icon">
            <LayoutGrid className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <PackageList
            id="not_shipped"
            title="Packages, Not Shipped"
            color="bg-blue-50"
            items={packages.not_shipped.items}
          />
          <PackageList
            id="shipped"
            title="Shipped Packages"
            color="bg-yellow-50"
            items={packages.shipped.items}
          />
          <PackageList
            id="delivered"
            title="Delivered Packages"
            color="bg-green-50"
            items={packages.delivered.items}
          />
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;