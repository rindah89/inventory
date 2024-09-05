
'use client'

import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

const InventoryForm = () => {
  const [itemType, setItemType] = useState('inventory');
  const [includeOpeningStock, setIncludeOpeningStock] = useState(false);
  const [isConfigureAccountsOpen, setIsConfigureAccountsOpen] = useState(false);

  return (
    <div className="  pb-6  bg-white  rounded-lg">
      <form className="space-y-6">
        <div className="flex items-center justify-between bg-slate-200 px-3 py-6">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Select your Item Type:</span>
            <div className="flex items-center space-x-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-blue-600"
                  name="itemType"
                  value="inventory"
                  checked={itemType === 'inventory'}
                  onChange={() => setItemType('inventory')}
                />
                <span className="ml-2">Inventory</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-blue-600"
                  name="itemType"
                  value="non-inventory"
                  checked={itemType === 'non-inventory'}
                  onChange={() => setItemType('non-inventory')}
                />
                <span className="ml-2">Non-Inventory</span>
              </label>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="includeOpeningStock"
              className="form-checkbox text-blue-600"
              checked={includeOpeningStock}
              onChange={() => setIncludeOpeningStock(!includeOpeningStock)}
            />
            <label htmlFor="includeOpeningStock" className="text-sm text-gray-700">
              Include Opening Stock
            </label>
            <QuestionMarkIcon />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 px-3 ">
          <InputField label="ITEM NAME" required />
          <InputField label="SKU" icon={<QuestionMarkIcon />} />
          <InputField label="COST PRICE ($)" required copyToAll />
          <InputField label="SELLING PRICE ($)" required copyToAll />
          <InputField label="UPC" icon={<QuestionMarkIcon />} />
          <InputField label="EAN" icon={<QuestionMarkIcon />} />
          <InputField label="ISBN" icon={<QuestionMarkIcon />} />
          <InputField label="REORDER POINT" copyToAll />
        </div>

        <div className=" px-3 text-sm text-gray-500">Please enter attributes.</div>

        <div className="border-t pt-4 px-3">
          <button
            type="button"
            className="flex items-center text-blue-600 hover:text-blue-800"
            onClick={() => setIsConfigureAccountsOpen(!isConfigureAccountsOpen)}
          >
            {isConfigureAccountsOpen ? (
              <ChevronUpIcon className="w-5 h-5 mr-1" />
            ) : (
              <ChevronDownIcon className="w-5 h-5 mr-1" />
            )}
            Configure Accounts
            <QuestionMarkIcon />
          </button>
          {isConfigureAccountsOpen && (
            <div className="mt-4 grid grid-cols-3 gap-4">
              <AccountSelect label="Sales Account" options={['Cost of Goods Sold']} />
              <AccountSelect label="Purchase Account" options={['[ 27821 ] Cost of Goods Sold']} />
              <AccountSelect label="Inventory Account" options={['Inventory Asset']} />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

const InputField = ({ label, required = false, icon, copyToAll = false }) => (
  <div className="flex flex-col">
    <label className="text-xs font-medium text-gray-700 mb-1">
      {label}
      {required && <span className="text-red-500">*</span>}
      {icon}
    </label>
    <div className="relative">
      <input
        type="text"
        className="w-full px-3 py-1 border  hover:border-blue-300 border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      {copyToAll && (
        <button
          type="button"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-blue-600 hover:text-blue-800"
        >
          COPY TO ALL
        </button>
      )}
    </div>
  </div>
);

const AccountSelect = ({ label, options }) => (
  <div className="flex flex-col">
    <label className="text-xs font-medium text-gray-700 mb-1  hover:border-blue-300">{label}</label>
    <select className="w-full px-3 py-1 border border-gray-300 hover:border-blue-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs">
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

const QuestionMarkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 text-gray-400 inline-block ml-1"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export default InventoryForm;