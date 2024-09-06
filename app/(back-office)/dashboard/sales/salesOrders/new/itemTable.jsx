import React, { useEffect } from 'react'
import { Controller, useFieldArray, useWatch } from 'react-hook-form'
import { Trash2, Plus } from 'lucide-react'
import { Input } from '../../../../../../components/ui/input'
import { Button } from '../../../../../../components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../../../components/ui/select'

export default function ItemTable({ control }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items"
  })

  const watchedItems = useWatch({
    control,
    name: "items",
    defaultValue: []
  })

  const shippingCharges = useWatch({
    control,
    name: "shippingCharges",
    defaultValue: 0
  })

  const calculateSubTotal = () => {
    return watchedItems.reduce((total, item) => {
      const amount = (item.quantity || 0) * (item.rate || 0)
      const discountAmount = item.discount && item.discount.value
        ? (item.discount.type === '%' ? amount * (item.discount.value / 100) : parseFloat(item.discount.value))
        : 0
      return total + (amount - discountAmount)
    }, 0)
  }

  const subTotal = calculateSubTotal()
  const total = subTotal + (parseFloat(shippingCharges) || 0)

  useEffect(() => {
    watchedItems.forEach((item, index) => {
      const amount = (item.quantity || 0) * (item.rate || 0)
      const discountAmount = item.discount && item.discount.value
        ? (item.discount.type === '%' ? amount * (item.discount.value / 100) : parseFloat(item.discount.value))
        : 0
      control.setValue(`items.${index}.amount`, amount - discountAmount)
    })
  }, [watchedItems, control])

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Item Table</h2>
        <Button type="button" variant="blue" size="sm">
          Bulk Actions
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-2 text-left">ITEM DETAILS</th>
              <th className="p-2 text-right">QUANTITY</th>
              <th className="p-2 text-right">RATE</th>
              <th className="p-2 text-right">DISCOUNT</th>
              <th className="p-2 text-left">TAX</th>
              <th className="p-2 text-right">AMOUNT</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => (
              <tr key={field.id} className="border-t">
                <td className="p-2">
                  <Controller
                    name={`items.${index}.details`}
                    control={control}
                    render={({ field }) => (
                      <Input {...field} placeholder="Type or click to select an item" className="w-full rounded border-slate-300 hover:border-blue-300" />
                    )}
                  />
                </td>
                <td className="p-2">
                  <Controller
                    name={`items.${index}.quantity`}
                    control={control}
                    render={({ field }) => (
                      <Input {...field} type="number" className="w-full text-right rounded border-slate-300 hover:border-blue-300" />
                    )}
                  />
                </td>
                <td className="p-2">
                  <Controller
                    name={`items.${index}.rate`}
                    control={control}
                    render={({ field }) => (
                      <Input {...field} type="number" step="0.01" className="w-full text-right rounded border-slate-300 hover:border-blue-300" />
                    )}
                  />
                </td>
                <td className="p-2">
                  <div className="flex items-center">
                    <Controller
                      name={`items.${index}.discount.value`}
                      control={control}
                      render={({ field }) => (
                        <Input {...field} type="number" step="0.01" className="w-full text-right rounded border-slate-300 hover:border-blue-300" />
                      )}
                    />
                    <Controller
                      name={`items.${index}.discount.type`}
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-[60px] ml-2 border-slate-300 hover:border-blue-300">
                            <SelectValue placeholder="%" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="%">%</SelectItem>
                            <SelectItem value="CFA">CFA</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </td>
                <td className="p-2">
                  <Controller
                    name={`items.${index}.tax`}
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="w-full rounded border-slate-300 hover:border-blue-300">
                          <SelectValue placeholder="Select a Tax" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tax1">Tax 1</SelectItem>
                          <SelectItem value="tax2">Tax 2</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </td>
                <td className="p-2">
                  <Controller
                    name={`items.${index}.amount`}
                    control={control}
                    render={({ field }) => (
                      <Input {...field} type="number" step="0.01" className="w-full text-right rounded border-slate-300" readOnly />
                    )}
                  />
                </td>
                <td className="p-2">
                  <Button type="button" variant="ghost" size="sm" onClick={() => remove(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid grid-cols-5 justify-between">
        <Button
          type="button"
          variant="blue"
          className="col-span-1"
          size="sm"
          onClick={() => append({ details: '', quantity: 1, rate: 0, discount: { value: 0, type: '%' }, tax: '', amount: 0 })}
        >
          <Plus className="h-4 w-4 mr-2" /> Add New Row
        </Button>
        <div className='col-span-1'></div>
        <div className="col-span-3 justify-end space-x-4 bg-slate-100 p-4">
          <div className="w-full">
            <div className="flex justify-between py-2">
              <span>Sub Total</span>
              <span>{subTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center py-2 pb-10 border-b border-slate-400">
              <span>Shipping Charges</span>
              <Controller
                name="shippingCharges"
                control={control}
                defaultValue={0}
                render={({ field }) => (
                  <Input {...field} type="number" step="1000" className="w-24 rounded hover:border-blue-300 text-right border-slate-400" />
                )}
              />
            </div>
            <div className="flex justify-between py-2 font-semibold">
              <span>Total ( CFA )</span>
              <span>{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}