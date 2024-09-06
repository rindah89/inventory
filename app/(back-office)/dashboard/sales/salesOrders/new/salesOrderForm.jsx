'use client'

import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Search, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../../../components/ui/select'
import { Input } from '../../../../../../components/ui/input'
import { Label } from '../../../../../../components/ui/label'
import { Textarea } from '../../../../../../components/ui/textarea'
import { Button } from '../../../../../../components/ui/button'
import ItemTable from './ItemTable'

const schema = z.object({
  customerName: z.string().min(1, 'Customer name is required'),
  salesOrderNumber: z.string().min(1, 'Sales order number is required'),
  reference: z.string().optional(),
  salesOrderDate: z.string().min(1, 'Sales order date is required'),
  expectedShipmentDate: z.string().optional(),
  paymentTerms: z.string().min(1, 'Payment terms are required'),
  deliveryMethod: z.string().optional(),
  salesperson: z.string().optional(),
  items: z.array(z.object({
    details: z.string().optional(),
    quantity: z.number().min(0, 'Quantity must be a positive number'),
    rate: z.number().min(0, 'Rate must be a positive number'),
    discount: z.number().min(0, 'Discount must be a positive number'),
    tax: z.string().optional(),
    amount: z.number().min(0, 'Amount must be a positive number'),
  })),
  customerNotes: z.string().optional(),
  termsAndConditions: z.string().optional(),
})

export default function NewSalesOrderForm() {
  const router = useRouter()
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      salesOrderNumber: 'SO-0000',
      salesOrderDate: new Date().toISOString().split('T')[0],
      items: [{ details: '', quantity: 1, rate: 0, discount: 0, tax: '', amount: 0 }],
    },
  })

  const onSubmit = async (data) => {
    console.log('Form data:', data)
    // Implement your save logic here
  }

  const handleCancel = () => {
    router.push('/dashboard/sales/salesOrders')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded border-slate-300 hover:border-blue-300-lg shadow-sm max-w-5xl">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">New Sales Order</h1>
          <div className="flex space-x-2">
            <Button type="button" variant="ghost" size="icon">
              <Search className="h-4 w-4" />
            </Button>
            <Button type="button" variant="ghost" size="icon">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Customer Name */}
        <div className="flex flex-col space-y-1">
          <Label htmlFor="customerName" className="text-sm font-medium text-gray-700">
            Customer Name<span className="text-red-500">*</span>
          </Label>
          <div className="flex">
            <Controller
              name="customerName"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id="customerName" className="flex-grow rounded border-slate-300 hover:border-blue-300">
                    <SelectValue placeholder="Select a customer" />
                  </SelectTrigger>
                  <SelectContent className='bg-slate-50'>
                    <SelectItem value="customer1">Customer 1</SelectItem>
                    <SelectItem value="customer2">Customer 2</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <Button type="button" className="rounded-r">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          {errors.customerName && <p className="text-red-500 text-sm">{errors.customerName.message}</p>}
        </div>

        {/* Sales Order Number and Reference */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-1">
            <Label htmlFor="salesOrderNumber" className="text-sm font-medium text-gray-700 rounded border-slate-300 hover:border-blue-300">
              Sales Order#<span className="text-red-500">*</span>
            </Label>
            <Controller
              name="salesOrderNumber"
              control={control}
              render={({ field }) => (
                <Input {...field} id="salesOrderNumber" className=" rounded border-slate-300 hover:border-blue-300" />
              )}
            />
            {errors.salesOrderNumber && <p className="text-red-500 text-sm">{errors.salesOrderNumber.message}</p>}
          </div>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="reference" className="text-sm font-medium text-gray-700">
              Reference#
            </Label>
            <Controller
              name="reference"
              control={control}
              render={({ field }) => (
                <Input {...field} id="reference" className="rounded border-slate-300 hover:border-blue-300" />
              )}
            />
          </div>
        </div>

        {/* Sales Order Date and Expected Shipment Date */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-1">
            <Label htmlFor="salesOrderDate" className="text-sm font-medium text-gray-700">
              Sales Order Date<span className="text-red-500">*</span>
            </Label>
            <Controller
              name="salesOrderDate"
              control={control}
              render={({ field }) => (
                <Input {...field} id="salesOrderDate" type="date" className="rounded border-slate-300 hover:border-blue-300" />
              )}
            />
            {errors.salesOrderDate && <p className="text-red-500 text-sm">{errors.salesOrderDate.message}</p>}
          </div>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="expectedShipmentDate" className="text-sm font-medium text-gray-700">
              Expected Shipment Date
            </Label>
            <Controller
              name="expectedShipmentDate"
              control={control}
              render={({ field }) => (
                <Input {...field} id="expectedShipmentDate" type="date" className="rounded border-slate-300 hover:border-blue-300" placeholder="dd MMM yyyy" />
              )}
            />
          </div>
        </div>

        {/* Payment Terms and Delivery Method */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-1">
            <Label htmlFor="paymentTerms" className="text-sm font-medium text-gray-700">
              Payment Terms
            </Label>
            <Controller
              name="paymentTerms"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id="paymentTerms" className="rounded border-slate-300 hover:border-blue-300">
                    <SelectValue placeholder="Select payment terms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="due-on-receipt">Due on Receipt</SelectItem>
                    <SelectItem value="net-30">Net 30</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="deliveryMethod" className="text-sm font-medium text-gray-700">
              Delivery Method
            </Label>
            <Controller
              name="deliveryMethod"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id="deliveryMethod" className="rounded border-slate-300 hover:border-blue-300">
                    <SelectValue placeholder="Select a delivery method or type to add" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard Delivery</SelectItem>
                    <SelectItem value="express">Express Delivery</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>

        {/* Salesperson */}
        <div className="flex flex-col space-y-1">
          <Label htmlFor="salesperson" className="text-sm font-medium text-gray-700">
            Salesperson
          </Label>
          <Controller
            name="salesperson"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="salesperson" className="rounded border-slate-300 hover:border-blue-300">
                  <SelectValue placeholder="Select or Add Salesperson" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="salesperson1">Salesperson 1</SelectItem>
                  <SelectItem value="salesperson2">Salesperson 2</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* Item Table */}
        <ItemTable control={control} />

        {/* Customer Notes */}
        <div className="flex flex-col space-y-1">
          <Label htmlFor="customerNotes" className="text-sm font-medium text-gray-700">
            Customer Notes
          </Label>
          <Controller
            name="customerNotes"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                id="customerNotes"
                placeholder="Enter any notes to be displayed in your transaction"
                className="min-h-[80px] rounded border-slate-300 hover:border-blue-300"
              />
            )}
          />
        </div>

        {/* Terms & Conditions */}
        <div className="flex flex-col space-y-1">
          <Label htmlFor="termsAndConditions" className="text-sm font-medium text-gray-700">
            Terms & Conditions
          </Label>
          <Controller
            name="termsAndConditions"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                id="termsAndConditions"
                placeholder="Enter the terms and conditions of your business to be displayed in your transaction"
                className="min-h-[80px] rounded border-slate-300 hover:border-blue-300"
              />
            )}
          />
        </div>

        {/* Form Actions */}
        <div className="flex justify-between items-center mt-6">
          <p className="text-sm text-gray-500">
            Additional Fields: Add custom fields to your sales orders by going to Settings ⇒ Sales ⇒ Sales orders ⇒ Field Customization.
          </p>
          <div className="flex space-x-4">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-600">
              Save and Send
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}