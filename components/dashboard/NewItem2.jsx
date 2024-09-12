import React from "react";
import { useRouter } from 'next/navigation';
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UploadDropzone } from "../../app/utils/uploadthing";
import { CircleHelp, X } from "lucide-react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const itemSchema = z.object({
  type: z.enum(["Goods", "Service"]),
  name: z.string().min(1, "Name is required"),
  sku: z.string().optional(),
  unit: z.string().min(1, "Unit is required"),
  returnable: z.boolean(),
  images: z.array(z.any()).optional(),
  dimensions: z.object({
    length: z.string().optional(),
    width: z.string().optional(),
    height: z.string().optional(),
    unit: z.enum(["cm", "in"]).optional(),
  }),
  weight: z.object({
    value: z.string().optional(),
    unit: z.enum(["kg", "g", "lb", "oz"]).optional(),
  }),
  manufacturer: z.string().optional(),
  brand: z.string().optional(),
  sellingPrice: z.string().min(1, "Selling price is required"),
  salesAccount: z.string().min(1, "Sales account is required"),
  salesDescription: z.string().optional(),
  salesTax: z.string().optional(),
  costPrice: z.string().min(1, "Cost price is required"),
  purchaseAccount: z.string().min(1, "Purchase account is required"),
  purchaseDescription: z.string().optional(),
  purchaseTax: z.string().optional(),
  preferredVendor: z.string().optional(),
});

const NewItem2 = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    //resolver: zodResolver(itemSchema),
    defaultValues: {
      type: "Goods",
      returnable: false,
      dimensions: { length: "", width: "", height: "", unit: "" },
      weight: { value: "", unit: "" },
    },
  });

  const onSubmit = async (data) => {
    console.log("onSubmit function called", data);
    setIsLoading(true);
    try {
      console.log("Sending data to API:", data);
      // ... rest of your submission logic
    } catch (error) {
      console.error('Error saving item:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleFormSubmit = (event) => {
    console.log("Form submit event triggered");
    event.preventDefault();
    const formData = watch();
    console.log("Full form data before submission:", formData);
    handleSubmit(onSubmit, onError)(event);
  };

  const handleButtonClick = () => {
    console.log("Save button clicked");
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel? Any unsaved changes will be lost.")) {
      router.push('/dashboard/inventory');
    }
  };

  const handleImageUpload = (uploadedFiles) => {
    setValue('images', [...(watch('images') || []), ...uploadedFiles]);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="max-w-5xl flex flex-col md:flex-row gap-8 mt-2 mr-60 items-center bg-slate-50 px-4 py-2">
        <div className="flex-1">
          <div className="mb-4 flex items-center space-x-4">
            <div className="flex items-center">
              <span className="block mr-1 text-sm ">Type</span>
              <CircleHelp className="w-4 h-4 text-slate-500" />
            </div>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="Goods"
                  {...register("type")}
                  className="mr-2 text-sm"
                />
                Goods
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="Service"
                  {...register("type")}
                  className="mr-2 text-sm"
                />
                Service
              </label>
            </div>
          </div>
          <div className="mb-4 flex space-x-3 items-center ">
            <label htmlFor="name" className="block mb-2 text-sm text-red-500">
              Name*
            </label>
            <input
              id="name"
              {...register("name")}
              className="w-full ml-2 p-1 border border-slate-300 rounded hover:border-blue-400"
            />
            {errors.name && <span className="text-red-500">{errors.name.message}</span>}
          </div>
          <div className="mb-4 flex items-center space-x-3">
            <label htmlFor="sku" className="block mb-2 mr-4 text-sm ">
              SKU
            </label>
            <input
              id="sku"
              {...register("sku")}
              className="w-full ml-4 p-1 border border-slate-300 rounded hover:border-blue-400"
            />
          </div>
          <div className="mb-4 flex items-center space-x-3">
            <label
              htmlFor="unit"
              className="block mb-2 mr-2 text-sm text-red-500"
            >
              Unit*
            </label>
            <select
              id="unit"
              {...register("unit")}
              className="w-full p-1 border rounded border-slate-300 hover:border-blue-400"
            >
              <option className="text-sm" value="">Select or type to add</option>
              <option value="piece">Piece</option>
              <option value="kg">Kilogram</option>
              <option value="liter">Liter</option>
            </select>
            {errors.unit && <span className="text-red-500">{errors.unit.message}</span>}
          </div>
          <div className="mb-4 justify-center">
            <label className="flex items-center text-sm justify-center">
              <input
                type="checkbox"
                {...register("returnable")}
                className="mr-2"
              />
              Returnable Item
            </label>
          </div>
        </div>
        <div className="flex-1">
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              console.log("Files: ", res);
              handleImageUpload(res);
              alert("Upload Completed");
            }}
            onUploadError={(error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />
          <p className="text-sm text-gray-500 mt-2">
            You can add up to 15 images, each not exceeding 5 MB.
          </p>
          {watch('images') && watch('images').length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold">Uploaded Images:</h3>
              <ul>
                {watch('images').map((image, index) => (
                  <li key={index}>{image.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="max-w-5xl p-6 space-y-6 border-b pb-10 border-slate-300">
        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-center">
            <div className="items-center space-x-2 justify-center">
              <Label htmlFor="dimensions">Dimensions</Label>
              <p className="text-xs text-gray-500">(Length X Width X Height)</p>
            </div>
            <Input
              id="length"
              placeholder="L"
              {...register("dimensions.length")}
              className="w-1/6 h-8 border-slate-400 rounded hover:border-blue-300"
            />
            <span className="flex items-center">
              <X className="w-4 h-4 text-slate-500" />
            </span>
            <Input
              id="width"
              placeholder="W"
              {...register("dimensions.width")}
              className="w-1/6 h-8 border-slate-400 rounded hover:border-blue-300"
            />
            <span className="flex items-center">
              <X className="w-4 h-4 text-slate-500" />
            </span>
            <Input
              id="height"
              placeholder="H"
              {...register("dimensions.height")}
              className="w-1/6 h-8 border-slate-400 rounded hover:border-blue-300"
            />
            <Controller
              name="dimensions.unit"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-[80px] h-8 ml-1 border-slate-400 rounded hover:border-blue-300">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-100">
                    <SelectItem value="cm">cm</SelectItem>
                    <SelectItem value="in">in</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex space-x-2 items-center">
            <Label htmlFor="weight">Weight</Label>
            <div className="flex space-x-2 h-8 border-slate-400 rounded hover:border-blue-300">
              <Input
                id="weight"
                placeholder="Weight"
                {...register("weight.value")}
                className="w-full h-8 border-slate-400 rounded hover:border-blue-300"
              />
              <Controller
                name="weight.unit"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-[80px] h-8 border-slate-400 rounded hover:border-blue-300">
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-100">
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="g">g</SelectItem>
                      <SelectItem value="lb">lb</SelectItem>
                      <SelectItem value="oz">oz</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2 flex items-center">
          <label htmlFor="name" className="block mb-2 text-sm ">
              Manufacturer
            </label>
            <input
              id="manufacturer"
              {...register("manufacturer")}
              className="w-full ml-2 p-1 border border-slate-300 rounded hover:border-blue-400"
            />
          </div>
          <div className="space-y-2 flex items-center">
          <label htmlFor="name" className="block mb-2 text-sm ">
              Brand
            </label>
            <input
              id="brand"
              {...register("brand")}
              className="w-full ml-2 p-1 border border-slate-300 rounded hover:border-blue-400"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mt-10 max-w-5xl mb-50">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Sales Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label htmlFor="sellingPrice" className="cursor-pointer">
                      Selling Price
                      <span className="block w-full h-px border-b border-dashed bg-slate-400 mt-0.5"></span>
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent className="bg-slate-900 text-white rounded">
                    <p>
                      The rate at which you're
                      <br /> going to sell this item
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className="flex ">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded">
                  CFA
                </span>
                <Input
                  id="sellingPrice"
                  {...register("sellingPrice")}
                  className="rounded border-slate-300 hover:border-blue-300"
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label htmlFor="salesAccount" className="cursor-pointer">
                      Account
                      <span className="block w-full h-px border-b border-dashed bg-slate-400 mt-0.5"></span>
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent className="bg-slate-900 text-white rounded">
                    <p>
                      All Sales & transactions of this item
                      <br /> will be tracked to this account
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Controller
                name="salesAccount"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-2/3 rounded border-slate-300 hover:border-blue-300 ">
                      <SelectValue placeholder="[ 3657 ] Sales" />
                    </SelectTrigger>
                    <SelectContent className='bg-slate-50'>
                      <SelectItem value="3657">[ 3657 ] Sales</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="flex justify-between items-center">
              <Label htmlFor="salesDescription">Description</Label>
              <Textarea
                id="salesDescription"
                {...register("salesDescription")}
                className="rounded border-slate-300 w-2/3 hover:border-blue-300"
              />
            </div>
            <div className="flex justify-between items-center">
              <Label htmlFor="salesTax">Tax</Label>
              <Controller
                name="salesTax"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-2/3 rounded border-slate-300 hover:border-blue-300">
                      <SelectValue placeholder="Select a Tax" />
                    </SelectTrigger>
                    <SelectContent className='bg-slate-50'>
                      <SelectItem value="tax1">Tax 1</SelectItem>
                      <SelectItem value="tax2">Tax 2</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Purchase Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label htmlFor="costPrice" className="cursor-pointer">
                      Cost Price
                      <span className="block w-full h-px border-b border-dashed bg-slate-400 mt-0.5"></span>
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent className="bg-slate-900 text-white rounded">
                    <p>
                      The rate at which you
                      <br /> bought this item
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded">
                  CFA
                </span>
                <Input
                  id="costPrice"
                  {...register("costPrice")}
                  className="rounded border-slate-300 hover:border-blue-300"
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label htmlFor="purchaseAccount" className="cursor-pointer">
                      Account
                      <span className="block w-full h-px border-b border-dashed bg-slate-400 mt-0.5"></span>
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent className="bg-slate-900 text-white rounded">
                    <p>
                      All purchase transactions of this item
                      <br /> will be tracked to this account
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Controller
                name="purchaseAccount"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-2/3 rounded border-slate-300 hover:border-blue-300 ">
                      <SelectValue placeholder="[ 93638 ] Cost of Goods Sold" />
                    </SelectTrigger>
                    <SelectContent className='bg-slate-50'>
                      <SelectItem value="93638">
                        [ 93638 ] Cost of Goods Sold
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="flex justify-between items-center">
              <Label htmlFor="purchaseDescription">Description</Label>
              <Textarea
                id="purchaseDescription"
                {...register("purchaseDescription")}
                className="w-2/3 rounded border-slate-300 hover:border-blue-300"
              />
            </div>
            <div className="flex justify-between items-center">
              <Label htmlFor="purchaseTax">Tax</Label>
              <Controller
                name="purchaseTax"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-2/3 rounded border-slate-300 hover:border-blue-300 ">
                      <SelectValue placeholder="Select a Tax" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tax1">Tax 1</SelectItem>
                      <SelectItem value="tax2">Tax 2</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="flex justify-between items-center">
              <Label htmlFor="preferredVendor">Preferred Vendor</Label>
              <Controller
                name="preferredVendor"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-2/3 rounded border-slate-300 hover:border-blue-300 ">
                      <SelectValue placeholder="Select a Vendor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vendor1">Vendor 1</SelectItem>
                      <SelectItem value="vendor2">Vendor 2</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="bg-slate-50 border-t border-gray-200 p-4 flex justify-start space-x-4 mt-10 max-w-5xl">
        <Button 
          type="button"
          variant="outline" 
          className="rounded border-blue-600 text-blue-600" 
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          variant="default" 
          className="rounded bg-blue-600 text-slate-100" 
          disabled={isLoading}
          onClick={handleButtonClick}
        >
          {isLoading ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  );
};

export default NewItem2;