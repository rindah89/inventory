'use client'

import React, { useEffect, useState } from 'react'
import { useFieldArray, Controller, useWatch } from 'react-hook-form'
import { X, GripVertical } from 'lucide-react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../../../components/ui/select'
import { Input } from '../../../../../../components/ui/input'
import { Button } from '../../../../../../components/ui/button'
import { Textarea } from '../../../../../../components/ui/textarea'

export default function InvoiceItemsSection({ control }) {
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "invoiceItems"
  })

  const [isClient, setIsClient] = useState(false)
  const invoiceItems = useWatch({ control, name: "invoiceItems" })

  useEffect(() => {
    setIsClient(true)
  }, [])

  const addNewRow = () => {
    append({ description: '', tax: '', amount: 0 })
  }

  const onDragEnd = (result) => {
    if (!result.destination) {
      return
    }
    move(result.source.index, result.destination.index)
  }

  const calculateSubTotal = () => {
    return invoiceItems.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0)
  }

  const subTotal = calculateSubTotal()
  const roundOff = Math.round((subTotal + Number.EPSILON) * 100) / 100 - subTotal
  const total = subTotal + roundOff

  if (!isClient) {
    return null // or a loading placeholder
  }

  return (
    <div className="space-y-4 max-w-5xl">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="invoice-items">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="w-8"></th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Description</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Tax</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Amount</th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {fields.map((field, index) => (
                    <Draggable key={field.id} draggableId={field.id} index={index}>
                      {(provided) => (
                        <tr
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <td className="px-2">
                            <div {...provided.dragHandleProps}>
                              <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                            </div>
                          </td>
                          <td className="px-4 py-2">
                            <Controller
                              name={`invoiceItems.${index}.description`}
                              control={control}
                              render={({ field }) => (
                                <Input
                                  {...field}
                                  placeholder="Description"
                                  className="w-full border-slate-300 rounded hover:border-blue-300 focus:border-blue-500 transition-colors"
                                />
                              )}
                            />
                          </td>
                          <td className="px-4 py-2">
                            <Controller
                              name={`invoiceItems.${index}.tax`}
                              control={control}
                              render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <SelectTrigger className="hover:border-blue-300 border-slate-300 rounded focus:border-blue-500 transition-colors">
                                    <SelectValue placeholder="Select a Tax" />
                                  </SelectTrigger>
                                  <SelectContent className='border-slate-300 rounded bg-slate-50'>
                                    <SelectItem value="no-tax">No Tax</SelectItem>
                                    {/* Add more tax options as needed */}
                                  </SelectContent>
                                </Select>
                              )}
                            />
                          </td>
                          <td className="px-4 py-2">
                            <Controller
                              name={`invoiceItems.${index}.amount`}
                              control={control}
                              render={({ field }) => (
                                <Input
                                  {...field}
                                  type="number"
                                  placeholder="0.00"
                                  className="w-full hover:border-blue-300 border-slate-300 rounded focus:border-blue-500 transition-colors"
                                />
                              )}
                            />
                          </td>
                          <td className="px-4 py-2">
                            <Button
                              type="button"
                              variant="ghost"
                              className="text-red-500"
                              onClick={() => remove(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </tbody>
              </table>
            </div>
          )}
        </Droppable>
      </DragDropContext>
<div className="flex justify-between">
<Button
        type="button"
        variant="outline"
        className="text-blue-500 rounded"
        onClick={addNewRow}
      >
        + Add New Row
      </Button>

      <div className=" space-y-2 bg-slate-100 p-5 rounded ">
        <div className="flex justify-between space-x-60">
          <span>Sub Total</span>
          <span>{subTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between space-x-20 border-b pb-10 text-sm text-gray-600">
          <span>Round Off</span>
          <span>{roundOff.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Total (CFA)</span>
          <span>{total.toFixed(2)}</span>
        </div>
      </div>
</div>
      

     
    </div>
  )
}