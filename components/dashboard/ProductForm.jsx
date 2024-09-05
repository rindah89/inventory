'use client'
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select } from '@/components/ui/select';

const ProductForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    type: 'Goods',
    name: '',
    sku: '',
    unit: '',
    returnable: false,
    dimensions: '',
    weight: '',
    brand: '',
    manufacturer: '',
    mpn: '',
    upc: '',
    isbn: '',
    ean: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">New Item</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block mb-1">Type</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value="Goods"
                    checked={formData.type === 'Goods'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Goods
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value="Service"
                    checked={formData.type === 'Service'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Service
                </label>
              </div>
            </div>
            <div>
              <label htmlFor="name" className="block mb-1">Name*</label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="sku" className="block mb-1">SKU</label>
              <Input
                id="sku"
                name="sku"
                value={formData.sku}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="unit" className="block mb-1">Unit*</label>
              <Select
                id="unit"
                name="unit"
                value={formData.unit}
                onChange={handleInputChange}
                required
              >
                <option value="">Select or type to add</option>
                <option value="piece">Piece</option>
                <option value="kg">Kilogram</option>
                <option value="liter">Liter</option>
              </Select>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="returnable"
                name="returnable"
                checked={formData.returnable}
                onCheckedChange={handleCheckboxChange}
              />
              <label htmlFor="returnable" className="ml-2">Returnable Item</label>
            </div>
            {/* Add more form fields here */}
          </div>
          <div className="mt-6 flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;