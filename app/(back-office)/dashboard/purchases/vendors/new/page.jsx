'use client'

import React, { useState } from "react";
import { Upload, Mail } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../../components/ui/select";
import { Input } from "../../../../../../components/ui/input";
import { Label } from "../../../../../../components/ui/label";
import { Button } from "../../../../../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../../../components/ui/tabs";

const NewVendor = () => {
  const [vendor, setVendor] = useState({
    salutation: "",
    firstName: "",
    lastName: "",
    companyName: "",
    displayName: "",
    email: "",
    workPhone: "",
    mobile: "",
    currency: "US Dollar",
    taxRate: "",
    paymentTerms: "Due on Receipt",
    priceList: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendor((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saving vendor...", vendor);
    // Implement save logic here
  };

  const handleCancel = () => {
    console.log("Cancelling...");
    // Implement cancel logic here
  };

  
    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-6">New Vendor</h1>
    
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4 items-end">
              <div>
                <Label htmlFor="salutation">Primary Contact</Label>
                <Select onValueChange={(value) => setVendor((prev) => ({ ...prev, salutation: value }))}>
                  <SelectTrigger id="salutation">
                    <SelectValue placeholder="Salutation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mr">Mr.</SelectItem>
                    <SelectItem value="mrs">Mrs.</SelectItem>
                    <SelectItem value="ms">Ms.</SelectItem>
                    <SelectItem value="dr">Dr.</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Input
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={vendor.firstName}
                onChange={handleChange}
              />
              <Input
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={vendor.lastName}
                onChange={handleChange}
              />
            </div>
    
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                name="companyName"
                value={vendor.companyName}
                onChange={handleChange}
              />
            </div>
    
            <div>
              <Label htmlFor="displayName" className="text-red-500">Vendor Display Name*</Label>
              <Select onValueChange={(value) => setVendor((prev) => ({ ...prev, displayName: value }))}>
                <SelectTrigger id="displayName">
                  <SelectValue placeholder="Select or type to add" />
                </SelectTrigger>
                <SelectContent>
                  {vendor.companyName && <SelectItem value={vendor.companyName}>{vendor.companyName}</SelectItem>}
                  {vendor.firstName && vendor.lastName && (
                    <SelectItem value={`${vendor.firstName} ${vendor.lastName}`}>
                      {`${vendor.firstName} ${vendor.lastName}`}
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
    
            <div>
              <Label htmlFor="email">Vendor Email</Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                  <Mail className="w-4 h-4" />
                </span>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={vendor.email}
                  onChange={handleChange}
                  className="rounded-l-none"
                />
              </div>
            </div>
    
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="workPhone">Vendor Phone</Label>
                <Input
                  id="workPhone"
                  name="workPhone"
                  placeholder="Work Phone"
                  value={vendor.workPhone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="mobile" className="invisible">Mobile</Label>
                <Input
                  id="mobile"
                  name="mobile"
                  placeholder="Mobile"
                  value={vendor.mobile}
                  onChange={handleChange}
                />
              </div>
            </div>
    
            <Tabs defaultValue="otherDetails" className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="otherDetails">Other Details</TabsTrigger>
                <TabsTrigger value="address">Address</TabsTrigger>
                <TabsTrigger value="contactPersons">Contact Persons</TabsTrigger>
                <TabsTrigger value="customFields">Custom Fields</TabsTrigger>
                <TabsTrigger value="reportingTags">Reporting Tags</TabsTrigger>
                <TabsTrigger value="remarks">Remarks</TabsTrigger>
              </TabsList>
    
              <TabsContent value="otherDetails" className="space-y-4">
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select onValueChange={(value) => setVendor((prev) => ({ ...prev, currency: value }))}>
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Select Currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">US Dollar</SelectItem>
                      <SelectItem value="EUR">Euro</SelectItem>
                      <SelectItem value="GBP">British Pound</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
    
                <div>
                  <Label htmlFor="taxRate">Tax Rate</Label>
                  <Select onValueChange={(value) => setVendor((prev) => ({ ...prev, taxRate: value }))}>
                    <SelectTrigger id="taxRate">
                      <SelectValue placeholder="Select a Tax" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tax1">Tax 1</SelectItem>
                      <SelectItem value="tax2">Tax 2</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500 mt-1">To associate more than one tax, you need to create a tax group in Settings.</p>
                </div>
    
                <div>
                  <Label htmlFor="paymentTerms">Payment Terms</Label>
                  <Select onValueChange={(value) => setVendor((prev) => ({ ...prev, paymentTerms: value }))}>
                    <SelectTrigger id="paymentTerms">
                      <SelectValue placeholder="Select Payment Terms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dueOnReceipt">Due on Receipt</SelectItem>
                      <SelectItem value="net30">Net 30</SelectItem>
                      <SelectItem value="net60">Net 60</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
    
                <div>
                  <Label htmlFor="priceList">Price List</Label>
                  <Select onValueChange={(value) => setVendor((prev) => ({ ...prev, priceList: value }))}>
                    <SelectTrigger id="priceList">
                      <SelectValue placeholder="Select a Price List" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="list1">Price List 1</SelectItem>
                      <SelectItem value="list2">Price List 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
    
                <div>
                  <Label htmlFor="documents">Documents</Label>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Upload className="mr-2 h-4 w-4" /> Upload File
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">You can upload a maximum of 10 files, 5MB each</p>
                </div>
              </TabsContent>
    
              {/* Add content for other tabs as needed */}
            </Tabs>
          </div>
    
          <div className="flex justify-start space-x-4 mt-6">
            <Button variant="default" onClick={handleSave} className="bg-blue-600 text-white hover:bg-blue-700">
              Save
            </Button>
            <Button variant="outline" onClick={handleCancel} className="border-blue-600 text-blue-600 hover:bg-blue-50">
              Cancel
            </Button>
          </div>
        </div>
      );
    };
export default NewVendor;