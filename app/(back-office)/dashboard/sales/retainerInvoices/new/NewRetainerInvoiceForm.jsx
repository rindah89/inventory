'use client'

import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { X, Search, CreditCard } from 'lucide-react'
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
import InvoiceItemsSection from './InvoiceItemsSection'

const schema = z.object({
  customerName: z.string().min(1, 'Customer name is required'),
  billingAddress: z.string().optional(),
  retainerInvoiceNumber: z.string().min(1, 'Retainer invoice number is required'),
  reference: z.string().optional(),
  retainerInvoiceDate: z.string().min(1, 'Retainer invoice date is required'),
  invoiceItems: z.array(z.object({
    description: z.string().optional(),
    tax: z.string().optional(),
    amount: z.number().min(0, 'Amount must be a positive number'),
  })),
  customerNotes: z.string().optional(),
  termsAndConditions: z.string().optional(),
})

export default function NewRetainerInvoiceForm() {
  const router = useRouter()
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      retainerInvoiceNumber: 'RET-00003',
      retainerInvoiceDate: new Date().toISOString().split('T')[0],
      invoiceItems: [{ description: '', tax: '', amount: 0 }],
    },
  })

  const onSubmit = async (data) => {
    console.log('Form data:', data)
    // Implement your save logic here
    // You might want to use an API route to handle the form submission
    // router.push('/dashboard/sales/retainer-invoices')
  }

  const handleCancel = () => {
    router.push('/dashboard/sales/retainerInvoices')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-sm max-w-5xl">
      <div className="space-y-6">
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
                  <SelectTrigger id="customerName" className="flex-grow rounded border-r-0 border-slate-300 hover:border-blue-300 focus:border-blue-500 transition-colors">
                    <SelectValue placeholder="Select a customer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lawrence-kuhn">Lawrence Kuhn</SelectItem>
                    {/* Add more customers as needed */}
                  </SelectContent>
                </Select>
              )}
            />
            <Button type="button" className="rounded text-slate-50 bg-blue-500 hover:bg-blue-600">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          {errors.customerName && <p className="text-red-500 text-sm">{errors.customerName.message}</p>}
        </div>

        {/* Billing Address */}
        <div className="flex flex-col space-y-1">
          <Label htmlFor="billingAddress" className="text-sm font-medium text-gray-700">
            BILLING ADDRESS
          </Label>
          <Controller
            name="billingAddress"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                id="billingAddress"
                className="min-h-[100px] border-slate-300 rounded hover:border-blue-300 focus:border-blue-500 transition-colors"
                placeholder="Enter billing address"
              />
            )}
          />
        </div>

        {/* Retainer Invoice Number and Reference */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-1">
            <Label htmlFor="retainerInvoiceNumber" className="text-sm font-medium text-gray-700">
              Retainer Invoice Number<span className="text-red-500">*</span>
            </Label>
            <Controller
              name="retainerInvoiceNumber"
              control={control}
              render={({ field }) => (
                <Input {...field} id="retainerInvoiceNumber" className="rounded border-slate-300 hover:border-blue-300 focus:border-blue-500 transition-colors" />
              )}
            />
            {errors.retainerInvoiceNumber && <p className="text-red-500 text-sm">{errors.retainerInvoiceNumber.message}</p>}
          </div>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="reference" className="text-sm font-medium text-gray-700">
              Reference#
            </Label>
            <Controller
              name="reference"
              control={control}
              render={({ field }) => (
                <Input {...field} id="reference" className="rounded border-slate-300 hover:border-blue-300 focus:border-blue-500 transition-colors" />
              )}
            />
          </div>
        </div>

        {/* Retainer Invoice Date */}
        <div className="flex flex-col space-y-1">
          <Label htmlFor="retainerInvoiceDate" className="text-sm font-medium text-gray-700">
            Retainer Invoice Date<span className="text-red-500">*</span>
          </Label>
          <Controller
            name="retainerInvoiceDate"
            control={control}
            render={({ field }) => (
              <Input {...field} id="retainerInvoiceDate" type="date" className="rounded border-slate-300 hover:border-blue-300 focus:border-blue-500 transition-colors" />
            )}
          />
          {errors.retainerInvoiceDate && <p className="text-red-500 text-sm">{errors.retainerInvoiceDate.message}</p>}
        </div>

        {/* Invoice Items */}
        <InvoiceItemsSection control={control} />

        {/* Customer Notes */}
        <div className="flex flex-col space-y-1">
          <Label htmlFor="customerNotes" className="text-sm border-slate-300 rounded font-medium text-gray-700">
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
                className="min-h-[80px] border-slate-300 rounded hover:border-blue-300 focus:border-blue-500 transition-colors"
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
                className="min-h-[80px] border-slate-300 rounded hover:border-blue-300 focus:border-blue-500 transition-colors"
              />
            )}
          />
        </div>

        

        {/* Form Actions */}
        <div className="flex justify-start space-x-4 mt-6">
          <Button type="button" variant="outline" className="border-gray-300 rounded text-gray-700" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" className="bg-blue-500 rounded text-white hover:bg-blue-600">
            Save and Send
          </Button>
        </div>
      </div>
    </form>
  )
}