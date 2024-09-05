"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const EditPriceListPage = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const [formData, setFormData] = useState({
    name: "",
    transactionType: "sales",
    priceListType: "allItems",
    description: "",
    percentageType: "markdown",
    percentageValue: "",
    roundOffTo: "0",
  });

  useEffect(() => {
    // In a real application, you would fetch the price list data here
    // For now, we'll simulate it with a timeout
    const fetchData = async () => {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setFormData({
        name: "PriceBook-0",
        transactionType: "sales",
        priceListType: "allItems",
        description: "blanditiis enim suscipit",
        percentageType: "markdown",
        percentageValue: "96.000000",
        roundOffTo: "0",
      });
    };
    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send the updated data to your API here
    console.log("Submitting updated price list:", formData);
    // After successful update, redirect back to the price list table
    router.push("/dashboard/inventory/price-lists");
  };

  return (
    <div className=" max-w-4xl p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Price List</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-4  items-center">
          <Label htmlFor="name" className="mr-11">
            Name*
          </Label>
          <Input
            id="name"
            name="name"
            className="py-1 text-sm rounded hover:border-blue-300 border-slate-300 ml-8  text-slate-600 "
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <Label>Transaction Type</Label>
          <RadioGroup
            name="transactionType"
            value={formData.transactionType}
            onValueChange={(value) =>
              handleRadioChange("transactionType", value)
            }
            className="flex space-x-4 "
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                className="text-blue-600"
                value="sales"
                id="sales"
              />
              <Label htmlFor="sales">Sales</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                className="text-blue-600 "
                value="purchase"
                id="purchase"
              />
              <Label htmlFor="purchase">Purchase</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="flex mt-6">
          <Label>Price List Type</Label>
          <RadioGroup
            name="priceListType"
            value={formData.priceListType}
            onValueChange={(value) => handleRadioChange("priceListType", value)}
            className="space-y-2 flex"
          >
            <div className="flex ml-6  items-center justify-center  space-x-2 py-2 px-4  bg-slate-200 rounded hover:border-blue-300">
              <RadioGroupItem
                value="allItems"
                id="allItems"
                className="text-blue-600"
              />

              <div className="justify-start">
                <Label htmlFor="allItems">All Items</Label>
                <div className=" text-sm text-gray-500">
                  Mark up or mark down the rates of all items
                </div>
              </div>
            </div>
            <div className="flex ml-6  items-center justify-center  space-x-2 py-2 px-4  bg-slate-200 rounded hover:border-blue-300">
              <RadioGroupItem
                value="individualItems"
                id="individualItems"
                className="text-blue-600 "
              />
              <div>
                <Label htmlFor="individualItems">Individual Items</Label>
                <div className=" text-sm text-gray-500">
                  Customize the rate of each item
                </div>
              </div>
            </div>
          </RadioGroup>
        </div>
        <div className="flex">
          <Label className="mr-7" htmlFor="description">
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            className="rounded border-slate-300 text-sm hover:border-blue-300 text-slate-700"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex items-center space-x-4">
  <div className="flex items-center">
    <Label htmlFor="percentage">Percentage*</Label>
    <Select
      name="percentageType"
      value={formData.percentageType}
      onValueChange={(value) => handleSelectChange("percentageType", value)}
    >
      <SelectTrigger className="rounded ml-4 bg-slate-200 border-slate-300 hover:border-blue-300">
        <SelectValue placeholder="Select type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="markdown">Markdown</SelectItem>
        <SelectItem value="markup">Markup</SelectItem>
      </SelectContent>
    </Select>
  </div>
  
  <div className="flex items-center">
    <Label htmlFor="percentageValue" className="sr-only">Percentage Value</Label>
    <Input
      id="percentageValue"
      name="percentageValue"
      type="number"
      step="0.000001"
      value={formData.percentageValue}
      onChange={handleInputChange}
      required
      className="rounded border-slate-300 text-slate-700 hover:border-blue-300 "
    />
  </div>
  
  <div className="flex items-end">
    <span className="text-2xl text-slate-700">%</span>
  </div>
</div>

        <div className="flex items-center space-x-3  ">
          <Label htmlFor="roundOffTo">Round Off To*</Label>
          <Select
            name="roundOffTo"
            value={formData.roundOffTo}
            onValueChange={(value) => handleSelectChange("roundOffTo", value)}
          >
            <SelectTrigger className='rounded border-slate-300 hover:border-blue-300'>
              <SelectValue placeholder="Select rounding" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">No rounding</SelectItem>
              <SelectItem value="1">Nearest whole number</SelectItem>
              <SelectItem value="0.1">1 decimal place</SelectItem>
              <SelectItem value="0.01">2 decimal places</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" className="border-blue-500 rounded text-blue-500" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button className='bg-blue-600 rounded text-slate-100' type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
};

export default EditPriceListPage;
