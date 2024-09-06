'use client'

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UploadDropzone } from "../../app/utils/uploadthing";
import { CircleHelp, Mail, Phone, ChevronDown, X } from "lucide-react";
import { useRouter } from 'next/navigation';
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
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const schema = z.object({
  customerType: z.enum(["Business", "Individual"]),
  salutation: z.string().optional(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  companyName: z.string().min(1, "Company name is required"),
  customerDisplayName: z.string().min(1, "Display name is required"),
  email: z.string().email("Invalid email address"),
  workPhone: z.string().min(1, "Work phone is required"),
  mobile: z.string().optional(),
  currency: z.string().min(1, "Currency is required"),
  taxRate: z.string().optional(),
  paymentTerms: z.string().min(1, "Payment terms are required"),
  priceList: z.string().optional(),
  remarks: z.string().optional(),
  reportingTags: z.string().optional(),
  contactPersons: z.string().optional(),

  address: z.string().optional(),


});

const NewCustomer = () => {
  const router = useRouter();
  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      customerType: "Business",
      currency: "US Dollar",
      paymentTerms: "Due on Receipt",
    },
  });

  const customerType = watch("customerType");

  const onSubmit = (data) => {
    console.log("Form data:", data);
    // Implement your save logic here
  };

  const handleCancel = () => {
    console.log("Cancelling...");
    // Implement your cancel logic here
  };

  const handleClose = () => {
    router.push('/dashboard/sales/customers');
  };

  const inputClassName = "w-full border border-gray-300 rounded hover:border-blue-300 focus:border-blue-500 transition-colors";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl  p-6 relative">
      <Button
        onClick={handleClose}
        className="absolute top-2 right-2 p-2"
        variant="ghost"
      >
        <X className="h-6 w-6" />
      </Button>
      <h1 className="text-2xl font-bold mb-6">New Customer</h1>
      <div className="space-y-6">
        {/* Customer Type */}
        <div className="flex items-center space-x-4">
          <Label>Customer Type</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <CircleHelp className="w-4 h-4 text-slate-500" />
              </TooltipTrigger>
              <TooltipContent className="p-2 bg-slate-900 rounded text-slate-50">
                <p>Select the type of customer you're adding</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Controller
            name="customerType"
            control={control}
            render={({ field }) => (
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    {...field}
                    value="Business"
                    checked={field.value === "Business"}
                    className="mr-2"
                  />
                  Business
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    {...field}
                    value="Individual"
                    checked={field.value === "Individual"}
                    className="mr-2"
                  />
                  Individual
                </label>
              </div>
            )}
          />
        </div>

        {/* Primary Contact */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="salutation">Primary Contact</Label>
            <Controller
              name="salutation"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id="salutation" className={inputClassName}>
                    <SelectValue placeholder="Salutation" />
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </SelectTrigger>
                  <SelectContent className="w-full border bg-slate-50 border-gray-300 rounded hover:border-blue-300 focus:border-blue-500 transition-colors">
                    <SelectItem value="mr">Mr.</SelectItem>
                    <SelectItem value="mrs">Mrs.</SelectItem>
                    <SelectItem value="ms">Ms.</SelectItem>
                    <SelectItem value="dr">Dr.</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="firstName"
                  className={inputClassName}
                  error={errors.firstName}
                />
              )}
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="lastName"
                  className={inputClassName}
                  error={errors.lastName}
                />
              )}
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
          </div>
        </div>

        {/* Company Name */}
        <div>
          <Label htmlFor="companyName">Company Name</Label>
          <Controller
            name="companyName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="companyName"
                className={inputClassName}
                error={errors.companyName}
              />
            )}
          />
          {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>}
        </div>

        {/* Customer Display Name */}
        <div>
          <Label htmlFor="customerDisplayName" className="flex items-center">
            Customer Display Name
            <span className="text-red-500 ml-1">*</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <CircleHelp className="w-4 h-4 text-slate-500 ml-1" />
                </TooltipTrigger>
                <TooltipContent className="p-2 bg-slate-900 rounded text-slate-50">
                  <p>This name will be displayed on transactions</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
          <Controller
            name="customerDisplayName"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="customerDisplayName" className={inputClassName}>
                  <SelectValue placeholder="Select or add a display name" />
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </SelectTrigger>
                <SelectContent className="w-full border bg-slate-50 border-gray-300 rounded hover:border-blue-300 focus:border-blue-500 transition-colors">
                  <SelectItem value="companyName">{watch("companyName")}</SelectItem>
                  <SelectItem value="fullName">{`${watch("firstName")} ${watch("lastName")}`}</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.customerDisplayName && <p className="text-red-500 text-sm mt-1">{errors.customerDisplayName.message}</p>}
        </div>

        {/* Customer Email */}
        <div>
          <Label htmlFor="email" className="flex items-center">
            Customer Email
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <CircleHelp className="w-4 h-4 text-slate-500 ml-1" />
                </TooltipTrigger>
                <TooltipContent className="p-2 bg-slate-900 rounded text-slate-50">
                  <p>Customer's email for communication</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
              <Mail className="w-4 h-4" />
            </span>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="email"
                  type="email"
                  className={`flex-grow border border-gray-300 rounded-r-md hover:border-blue-300 focus:border-blue-500 transition-colors`}
                  error={errors.email}
                />
              )}
            />
          </div>
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Customer Phone */}
        <div className="grid grid-cols-2 gap-4 items-center">
          <div>
            <Label htmlFor="workPhone" className="flex items-center">
              Customer Phone
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <CircleHelp className="w-4 h-4 text-slate-500 ml-1" />
                  </TooltipTrigger>
                  <TooltipContent className="p-2 bg-slate-900 rounded text-slate-50">
                    <p>Customer's work phone number</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                <Phone className="w-4 h-4" />
              </span>
              <Controller
                name="workPhone"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="workPhone"
                    type="tel"
                    placeholder="Work Phone"
                    className={`flex-grow border border-gray-300 rounded-r-md hover:border-blue-300 focus:border-blue-500 transition-colors`}
                    error={errors.workPhone}
                  />
                )}
              />
            </div>
            {errors.workPhone && <p className="text-red-500 text-sm ">{errors.workPhone.message}</p>}
          </div>
          <div>
            <Label htmlFor="mobile">&nbsp;</Label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                <Phone className="w-4 h-4" />
              </span>
              <Controller
                name="mobile"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="mobile"
                    type="tel"
                    placeholder="Mobile"
                    className={`flex-grow border border-gray-300 rounded-r-md hover:border-blue-300 focus:border-blue-500 transition-colors`}
                  />
                )}
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="otherDetails">
          <TabsList>
            <TabsTrigger value="otherDetails">Other Details</TabsTrigger>
            <TabsTrigger value="address">Address</TabsTrigger>
            <TabsTrigger value="contactPersons">Contact Persons</TabsTrigger>
            <TabsTrigger value="customFields">Custom Fields</TabsTrigger>
            <TabsTrigger value="reportingTags">Reporting Tags</TabsTrigger>
            <TabsTrigger value="remarks">Remarks</TabsTrigger>
          </TabsList>
          <TabsContent value="otherDetails">
            <Card>
              <CardContent className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Controller
                    name="currency"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger id="currency"   className="w-full border bg-slate-50 border-gray-300 rounded hover:border-blue-300 focus:border-blue-500 transition-colors"
                        >
                          <SelectValue placeholder="Select Currency" />
                          <ChevronDown className="h-4 w-4 opacity-50" />
                        </SelectTrigger>
                        <SelectContent className="w-full border bg-slate-50 border-gray-300 rounded hover:border-blue-300 focus:border-blue-500 transition-colors">
                          <SelectItem value="CFA">CFA</SelectItem>
                          <SelectItem value="Euro">Euro</SelectItem>
                          <SelectItem value="US dollar">US Dollar</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.currency && <p className="text-red-500 text-sm mt-1">{errors.currency.message}</p>}
                </div>
                <div>
                  <Label htmlFor="taxRate">Tax Rate</Label>
                  <Controller
                    name="taxRate"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger id="taxRate" className="w-full border bg-slate-50 border-gray-300 rounded hover:border-blue-300 focus:border-blue-500 transition-colors">
                          <SelectValue placeholder="Select a Tax" />
                          <ChevronDown className="h-4 w-4 opacity-50" />
                        </SelectTrigger>
                        <SelectContent className="w-full border bg-slate-50 border-gray-300 rounded hover:border-blue-300 focus:border-blue-500 transition-colors">
                          <SelectItem value="tax1">Tax 1</SelectItem>
                          <SelectItem value="tax2">Tax 2</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    To associate more than one tax, you need to create a tax group in Settings.
                  </p>
                </div>
                <div>
                  <Label htmlFor="paymentTerms">Payment Terms</Label>
                  <Controller
                    name="paymentTerms"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger id="paymentTerms" className="w-full border bg-slate-50 border-gray-300 rounded hover:border-blue-300 focus:border-blue-500 transition-colors">
                          <SelectValue placeholder="Select Payment Terms" />
                          <ChevronDown className="h-4 w-4 opacity-50" />
                        </SelectTrigger>
                        <SelectContent className="w-full border bg-slate-50 border-gray-300 rounded hover:border-blue-300 focus:border-blue-500 transition-colors">
                          <SelectItem value="Due on Receipt">Due on Receipt</SelectItem>
                          <SelectItem value="Net 30">Net 30</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.paymentTerms && <p className="text-red-500 text-sm mt-1">{errors.paymentTerms.message}</p>}
                </div>
                <div>
                  <Label htmlFor="priceList">Price List</Label>
                  <Controller
                    name="priceList"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger id="priceList" className="w-full border bg-slate-50 border-gray-300 rounded hover:border-blue-300 focus:border-blue-500 transition-colors">
                          <SelectValue placeholder="Select Price List" />
                          <ChevronDown className="h-4 w-4 opacity-50" />
                        </SelectTrigger>
                        <SelectContent className="w-full border bg-slate-50 border-gray-300 rounded hover:border-blue-300 focus:border-blue-500 transition-colors">
                          <SelectItem value="default">Default</SelectItem>
                          <SelectItem value="wholesale">Wholesale</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div>
                  <Label>Documents</Label>
                  <UploadDropzone
                    endpoint="documentUploader"
                    onClientUploadComplete={(res) => {
                      console.log("Files: ", res);
                      // Handle the uploaded files here
                      alert("Upload Completed");
                    }}
                    onUploadError={(error) => {
                      alert(`ERROR! ${error.message}`);
                    }}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    You can upload a maximum of 10 files, 5MB each
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="address">
            {/* Implement Address tab content */}
            <Card>
            <CardContent>
                <Label htmlFor="address">Address</Label>
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      id="address"
                      placeholder="Enter address information here"
                      className={`${inputClassName} mt-1`}
                      rows={4}
                    />
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="contactPersons">
            {/* Implement Contact Persons tab content */}
            <Card>
            <CardContent>
                <Label htmlFor="contactPersons">Contact information</Label>
                <Controller
                  name="contactPersons"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      id="contactPersons"
                      placeholder="Enter any additional contact information here"
                      className={`${inputClassName} mt-1`}
                      rows={4}
                    />
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="customFields">
            {/* Implement Custom Fields tab content */}
            <Card>
            <CardContent>
                <Label htmlFor="customFelds">Custom Fields</Label>
                <Controller
                  name="customFelds"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      id="customFelds"
                      placeholder="Enter any additional remarks here"
                      className={`${inputClassName} mt-1`}
                      rows={4}
                    />
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reportingTags">
            <Card>
              <CardContent>
              <Label htmlFor="reportingTags">Reporting Tags</Label>
                <Controller
                  name="reportingTags"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      id="reportingTags"
                      placeholder="Enter any additional reporting information here"
                      className={`${inputClassName} mt-1`}
                      rows={4}
                    />
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="remarks">
            <Card>
              <CardContent>
                <Label htmlFor="remarks">Remarks</Label>
                <Controller
                  name="remarks"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      id="remarks"
                      placeholder="Enter any additional remarks here"
                      className={`${inputClassName} mt-1`}
                      rows={4}
                    />
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Form Actions */}
        <div className="flex justify-start space-x-4 mt-6">
          <Button type="button" variant="outline" className="rounded border-blue-500 text-blue-500" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="blue">
            Save
          </Button>
        </div>
      </div>
    </form>
  );
};

export default NewCustomer;