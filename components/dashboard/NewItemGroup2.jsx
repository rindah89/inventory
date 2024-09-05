import React, { useState } from "react";
import { UploadDropzone } from "../../app/utils/uploadthing";
import { CircleHelp, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { Label } from "../ui/label";

import { Button } from "../ui/button";

import AttributesForm from "./Attributes";
import InventoryForm from "./NewItemsGroupForm";

const NewItemGroup2 = () => {
  const [type, setType] = useState("Goods");
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [unit, setUnit] = useState("");
  const [returnable, setReturnable] = useState(false);
  const [images, setImages] = useState([]);

  const handleImageUpload = (uploadedFiles) => {
    setImages((prev) => [...prev, ...uploadedFiles]);
  };
  const handleSave = () => {
    // Implement save logic here
    console.log("Saving item...", {
      type,
      name,
      sku,
      unit,
      returnable,
      images,
    });
    // You can add API calls or state updates here
  };

  const handleCancel = () => {
    // Implement cancel logic here
    console.log("Cancelling...");
    // You can add navigation or state reset logic here
  };
  return (
    <>
      <div className="  flex flex-col md:flex-row gap-8 mt-2 mr-60 items-center bg-slate-50 px-4 py-2">
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
                  checked={type === "Goods"}
                  onChange={() => setType("Goods")}
                  className="mr-2 text-sm"
                />
                Goods
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="Service"
                  checked={type === "Service"}
                  onChange={() => setType("Service")}
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
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full ml-2 p-1 border border-slate-300 rounded hover:border-blue-400"
              required
            />
          </div>
          <div className="mb-4 flex items-center space-x-3">
            <label htmlFor="sku" className="block mb-2 mr-4 text-sm ">
              SKU
            </label>
            <input
              id="sku"
              type="text"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="w-full ml-4 p-1 border border-slate-300 rounded hover:border-blue-400"
            />
          </div>

          <div className="mb-4 justify-center">
            <label className="flex items-center text-sm justify-center">
              <input
                type="checkbox"
                checked={returnable}
                onChange={(e) => setReturnable(e.target.checked)}
                className="mr-2"
              />
              Returnable Item
            </label>
          </div>
        </div>
        <div className="flex-">
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
          {images.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold">Uploaded Images:</h3>
              <ul>
                {images.map((image, index) => (
                  <li key={index}>{image.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className=" max-w-4xl p-6 space-y-6 border-b pb-10 border-slate-300">
        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-center">
            <div className="space-y-2 flex items-center justify-between">
              <Label htmlFor="unit">Unit*</Label>
              <Select>
                <SelectTrigger
                  id="unit"
                  className="min-w-xl w-full h-8 ml-16 border-slate-400 rounded hover:border-blue-300"
                >
                  <SelectValue placeholder="Please select your units" />
                </SelectTrigger>
                <SelectContent className="bg-slate-100">
                  <SelectItem value="dozen" className="hover:text-blue-300">
                    DOZEN
                  </SelectItem>
                  <SelectItem value="box" className="hover:text-blue-300">
                    BOX
                  </SelectItem>
                  <SelectItem value="grams" className="hover:text-blue-300">
                    GRAMS
                  </SelectItem>
                  <SelectItem value="kilograms" className="hover:text-blue-300">
                    KILOGRAMS
                  </SelectItem>
                  <SelectItem value="meters" className="hover:text-blue-300">
                    METERS
                  </SelectItem>
                  <SelectItem value="tablets" className="hover:text-blue-300">
                    TABLETS
                  </SelectItem>
                  <SelectItem value="units" className="hover:text-blue-300">
                    UNITS
                  </SelectItem>
                  <SelectItem value="pieces" className="hover:text-blue-300">
                    PIECES
                  </SelectItem>
                  <SelectItem value="pairs" className="hover:text-blue-300">
                    PAIRS
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex space-x-2 items-center">
            <Label htmlFor="tax">Tax</Label>
            <div className="flex space-x-2 h-8 border-slate-400 rounded hover:border-blue-300">
              <Select>
                <SelectTrigger
                  id="tax"
                  className="min-w-xl w-full h-8 ml-4 border-slate-400 rounded hover:border-blue-300"
                >
                  <SelectValue placeholder="Enter the tax category" />
                </SelectTrigger>
                <SelectContent className="bg-slate-100">
                  <SelectItem value="vat">VAT</SelectItem>
                  <SelectItem value="none">No Tax</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2 flex items-center">
            <Label htmlFor="manufacturer">Manufacturer</Label>
            <Select>
              <SelectTrigger
                id="manufacturer"
                className="w-full h-8 ml-2 border-slate-400 rounded hover:border-blue-300 "
              >
                <SelectValue placeholder="Select or Add Manufacturer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="add">Add Manufacturer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 flex items-center">
            <Label htmlFor="brand">Brand</Label>
            <Select>
              <SelectTrigger
                id="brand"
                className="w-full h-8 ml-2 border-slate-400 rounded hover:border-blue-300 "
              >
                <SelectValue placeholder="Select or Add Brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="add">Add Brand</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <AttributesForm />
      <InventoryForm />

      <div className="  bg-slate-50 border-t border-gray-200 p-4 flex justify-start space-x-4 mt-10 max-w-5xl">
        <Button
          variant="outline"
          className="rounded border-blue-600 text-blue-600"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          variant="default"
          className="rounded bg-blue-600 text-slate-100"
          onClick={handleSave}
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default NewItemGroup2;
