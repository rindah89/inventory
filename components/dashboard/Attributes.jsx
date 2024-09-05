'use client'

import { useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';

 const AttributesForm = () => {
  const [createAttributes, setCreateAttributes] = useState(false);
  const [attributes, setAttributes] = useState([{ attribute: '', options: '' }]);

  const handleCheckboxChange = (e) => {
    setCreateAttributes(e.target.checked);
  };

  const handleAttributeChange = (index, field, value) => {
    const newAttributes = [...attributes];
    newAttributes[index][field] = value;
    setAttributes(newAttributes);
  };

  const addAttribute = () => {
    setAttributes([...attributes, { attribute: '', options: '' }]);
  };

  const removeAttribute = (index) => {
    const newAttributes = attributes.filter((_, i) => i !== index);
    setAttributes(newAttributes);
  };

  return (
    <div className="max-w-4xl mt-5 p-4">
      <div className="mb-4 flex items-center">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={createAttributes}
            onChange={handleCheckboxChange}
            className="form-checkbox h-5 w-5 text-blue-600 rounded"
          />
          <span className="ml-2 text-red-500 text-sm">Create Attributes and Options*</span>
        </label>
      </div>

      {createAttributes && (
        <div className="space-y-4">
          {attributes.map((attr, index) => (
            <div key={index} className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Attribute*
                </label>
                <input
                  type="text"
                  value={attr.attribute}
                  onChange={(e) => handleAttributeChange(index, 'attribute', e.target.value)}
                  placeholder="eg: color"
                  className="w-full px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Options*
                </label>
                <input
                  type="text"
                  value={attr.options}
                  onChange={(e) => handleAttributeChange(index, 'options', e.target.value)}
                  className="w-full px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={() => removeAttribute(index)}
                className="self-end p-2 text-red-500 hover:text-red-700"
                aria-label="Remove attribute"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
          <button
            onClick={addAttribute}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <PlusCircle size={20} className="mr-1" />
            Add more attributes
          </button>
        </div>
      )}
    </div>
  );
};

export default AttributesForm;