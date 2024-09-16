'use client'
import React, { useState } from "react";
import { useForm } from "@conform-to/react";
import { useFormState } from "react-dom";
import { parseWithZod } from "@conform-to/zod";
import { ItemSchema } from "../../app/lib/zodSchemas";
import { updateItem } from "../../app/actions/itemActions";
import { UploadDropzone } from "../../app/utils/uploadthing";
import { CircleHelp, XIcon } from "lucide-react";
import Image from "next/image";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";

export default function EditItem({ initialData }) {
  const [images, setImages] = useState(initialData.images || []);
  const [lastResult, action] = useFormState(updateItem, undefined);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: ItemSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    defaultValue: initialData,
  });

  const handleDelete = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

    return(
<form id={form.id} onSubmit={form.onSubmit} action={action}>
      <Card className="max-w-5xl">
        <CardHeader>
            Edit Product
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <Label>Type</Label>
            <div className="flex gap-4">
              {["Goods", "Service"].map((value) => (
                <label key={value} className="flex items-center">
                  <input
                    type="radio"
                    name={fields.type.name}
                    value={value}
                    defaultChecked={fields.type.initialValue === value}
                    className="mr-2"
                  />
                  {value}
                </label>
              ))}
            </div>
            <p className="text-red-500">{fields.type.errors}</p>
          </div>
<div className="flex space-x-4 ">
  <div>
          <div className="space-y-2">
            <Label htmlFor={fields.name.id}>Name</Label>
            <Input
              id={fields.name.id}
              name={fields.name.name}
              defaultValue={fields.name.initialValue}
              className="rounded border-slate-300 hover:border-blue-300"
            />
            <p className="text-red-500">{fields.name.errors}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor={fields.sku.id}>SKU</Label>
            <Input
              id={fields.sku.id}
              name={fields.sku.name}
              defaultValue={fields.sku.initialValue}
              className="rounded border-slate-300 hover:border-blue-300"

            />
            <p className="text-red-500">{fields.sku.errors}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor={fields.unit.id}>Unit</Label>
            <Input
              id={fields.unit.id}
              name={fields.unit.name}
              defaultValue={fields.unit.initialValue}
              className="rounded border-slate-300 hover:border-blue-300"

            />
            <p className="text-red-500">{fields.unit.errors}</p>
          </div>

          <div className="flex items-center space-x-2">
            <Label htmlFor={fields.returnable.id}>Returnable</Label>
            <Switch
              id={fields.returnable.id}
              name={fields.returnable.name}
              defaultChecked={fields.returnable.initialValue}
              className="bg-blue-300"
            />
            <p className="text-red-500">{fields.returnable.errors}</p>
          </div>

          <div className="space-y-2">
            <Label>Dimensions</Label>
            <div className="flex space-x-2">
              <Input
                placeholder="Length"
                name={`${fields.dimensions.name}.length`}
                defaultValue={fields.dimensions.initialValue?.length}
                type="number"
                className="rounded border-slate-300 hover:border-blue-300"

              />
              <Input
                placeholder="Width"
                name={`${fields.dimensions.name}.width`}
                defaultValue={fields.dimensions.initialValue?.width}
                type="number"
                className="rounded border-slate-300 hover:border-blue-300"

              />
              <Input
                placeholder="Height"
                name={`${fields.dimensions.name}.height`}
                defaultValue={fields.dimensions.initialValue?.height}
                type="number"
                className="rounded border-slate-300 hover:border-blue-300"

              />
              <Select name={`${fields.dimensions.name}.unit`} defaultValue={fields.dimensions.initialValue?.unit}>
                <SelectTrigger className="rounded border-slate-300 hover:border-blue-300"
                >
                  <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent className="bg-slate-50"
                >
                  <SelectItem value="cm">cm</SelectItem>
                  <SelectItem value="in">in</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-red-500">{fields.dimensions.errors}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor={fields.weight.id}>Weight</Label>
            <div className="flex space-x-2">
              <Input
                id={fields.weight.id}
                name={fields.weight.name}
                defaultValue={fields.weight.initialValue}
                type="number"
                className="rounded border-slate-300 hover:border-blue-300"

              />
              <Select name={fields.weightUnit.name} defaultValue={fields.weightUnit.initialValue}>
                <SelectTrigger className="rounded border-slate-300 hover:border-blue-300"
                >
                  <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent  className="bg-slate-100"
                >
                  <SelectItem value="kg">kg</SelectItem>
                  <SelectItem value="g">g</SelectItem>
                  <SelectItem value="lb">lb</SelectItem>
                  <SelectItem value="oz">oz</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-red-500">{fields.weight.errors}</p>
            <p className="text-red-500">{fields.weightUnit.errors}</p>
          </div>
          </div>
          
          <div className="flex flex-col gap-3">
              <Label>Images</Label>
              <input
                type="hidden"
                value={images}
                key={fields.images.key}
                name={fields.images.name}
                defaultValue={fields.images.initialValue }
              />
              {images.length > 0 ? (
                <div className="flex gap-5">
                  {images.map((image, index) => (
                    <div key={index} className="relative w-[100px] h-[100px]">
                      <Image
                        height={100}
                        width={100}
                        src={image}
                        alt="Product Image"
                        className="w-full h-full object-cover rounded-lg border"
                      />

                      <button
                        onClick={() => handleDelete(index)}
                        type="button"
                        className="absolute -top-3 -right-3 bg-red-500 p-2 rounded-lg text-white"
                      >
                        <XIcon className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    setImages(res.map((r) => r.url));
                  }}
                  onUploadError={() => {
                    alert("Something went wrong");
                  }}
                />
              )}
            {fields.images?.errors && (
              <p className="text-red-500">{fields.images.errors}</p>
            )}

            </div>
</div>
          <div className="space-y-2">
            <Label htmlFor={fields.manufacturer.id}>Manufacturer</Label>
            <Input
              id={fields.manufacturer.id}
              name={fields.manufacturer.name}
              defaultValue={fields.manufacturer.initialValue}
              className="rounded border-slate-300 hover:border-blue-300"

            />
            <p className="text-red-500">{fields.manufacturer.errors}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor={fields.brand.id}>Brand</Label>
            <Input
              id={fields.brand.id}
              name={fields.brand.name}
              defaultValue={fields.brand.initialValue}
              className="rounded border-slate-300 hover:border-blue-300"

            />
            <p className="text-red-500">{fields.brand.errors}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor={fields.sellingPrice.id}>Selling Price</Label>
            <Input
              id={fields.sellingPrice.id}
              name={fields.sellingPrice.name}
              defaultValue={fields.sellingPrice.initialValue}
              type="number"
              step="0.01"
              className="rounded border-slate-300 hover:border-blue-300"

            />
            <p className="text-red-500">{fields.sellingPrice.errors}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor={fields.salesAccount.id}>Sales Account</Label>
            <Input
              id={fields.salesAccount.id}
              name={fields.salesAccount.name}
              defaultValue={fields.salesAccount.initialValue}
              className="rounded border-slate-300 hover:border-blue-300"

            />
            <p className="text-red-500">{fields.salesAccount.errors}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor={fields.salesDescription.id}>Sales Description</Label>
            <Textarea
              id={fields.salesDescription.id}
              name={fields.salesDescription.name}
              defaultValue={fields.salesDescription.initialValue}
              className="rounded border-slate-300 hover:border-blue-300"

            />
            <p className="text-red-500">{fields.salesDescription.errors}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor={fields.salesTax.id}>Sales Tax</Label>
            <Input
              id={fields.salesTax.id}
              name={fields.salesTax.name}
              defaultValue={fields.salesTax.initialValue}
              className="rounded border-slate-300 hover:border-blue-300"

            />
            <p className="text-red-500">{fields.salesTax.errors}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor={fields.costPrice.id}>Cost Price</Label>
            <Input
              id={fields.costPrice.id}
              name={fields.costPrice.name}
              defaultValue={fields.costPrice.initialValue}
              type="number"
              step="0.01"
              className="rounded border-slate-300 hover:border-blue-300"

            />
            <p className="text-red-500">{fields.costPrice.errors}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor={fields.purchaseAccount.id}>Purchase Account</Label>
            <Input
              id={fields.purchaseAccount.id}
              name={fields.purchaseAccount.name}
              defaultValue={fields.purchaseAccount.initialValue}
              className="rounded border-slate-300 hover:border-blue-300"

            />
            <p className="text-red-500">{fields.purchaseAccount.errors}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor={fields.purchaseDescription.id}>Purchase Description</Label>
            <Textarea
              id={fields.purchaseDescription.id}
              name={fields.purchaseDescription.name}
              defaultValue={fields.purchaseDescription.initialValue}
              className="rounded border-slate-300 hover:border-blue-300"

            />
            <p className="text-red-500">{fields.purchaseDescription.errors}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor={fields.purchaseTax.id}>Purchase Tax</Label>
            <Input
              id={fields.purchaseTax.id}
              name={fields.purchaseTax.name}
              defaultValue={fields.purchaseTax.initialValue}
              className="rounded border-slate-300 hover:border-blue-300"

            />
            <p className="text-red-500">{fields.purchaseTax.errors}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor={fields.preferredVendor.id}>Preferred Vendor</Label>
            <Input
              id={fields.preferredVendor.id}
              name={fields.preferredVendor.name}
              defaultValue={fields.preferredVendor.initialValue}
              className="rounded border-slate-300 hover:border-blue-300"

            />
            <p className="text-red-500">{fields.preferredVendor.errors}</p>
          </div>

          {/* You can add image upload functionality here if needed */}
        </CardContent>
      </Card>

      <div className="bg-slate-50 border-t border-gray-200 p-4 flex justify-start space-x-4 mt-10 max-w-5xl mx-auto">
        <Button variant="outline" className="rounded border-blue-600 text-blue-600" type="button">
          Cancel
        </Button>
        <Button variant="default" className="rounded bg-blue-600 text-slate-100" type="submit">
          Save
        </Button>
      </div>

      {lastResult?.error && <p className="text-red-500 mt-4">{lastResult.error}</p>}
      {lastResult?.message && <p className="text-green-500 mt-4">{lastResult.message}</p>}
    </form>
  );
};


