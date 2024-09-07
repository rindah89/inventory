
 import React from 'react';
import { Search, ShoppingCart, Package, FileText, CreditCard, DollarSign, ShoppingBag } from 'lucide-react';
import { Input } from "../../../../components/ui/input"
import { Button } from "../../../../components/ui/button"

const ReportCategory = ({ title, icon, reports }) => (
  <div className="mb-6">
    <div className="flex items-center mb-2">
      {icon}
      <h2 className="text-lg font-semibold ml-2">{title}</h2>
    </div>
    <ul>
      {reports.map((report, index) => (
        <li key={index} className="text-blue-500 hover:underline cursor-pointer mb-1">
          {report}
        </li>
      ))}
    </ul>
  </div>
);

const ReportsDashboard = () => {
  const categories = [
    {
      title: "Sales",
      icon: <ShoppingCart className="w-5 h-5" />,
      reports: [
        "Sales by Customer",
        "Sales by Item",
        "Order Fulfillment By Item",
        "Sales Return History",
        "Sales by Sales Person",
        "Packing History"
      ]
    },
    {
      title: "Inventory",
      icon: <Package className="w-5 h-5" />,
      reports: [
        "Inventory Summary",
        "Committed Stock Details",
        "Inventory Valuation Summary",
        "FIFO Cost Lot Tracking",
        "Inventory Aging Summary",
        "Product Sales Report",
        "Active Purchase Orders Report",
        "Stock Summary Report"
      ]
    },
    {
      title: "Receivables",
      icon: <FileText className="w-5 h-5" />,
      reports: [
        "Customer Balances",
        "Invoice Details",
        "Retainer Invoice Details",
        "Sales Order Details",
        "Receivable Summary",
        "Receivable Details"
      ]
    },
    {
      title: "Payments Received",
      icon: <CreditCard className="w-5 h-5" />,
      reports: [
        "Payments Received",
        "Refund History"
      ]
    },
    {
      title: "Payables",
      icon: <DollarSign className="w-5 h-5" />,
      reports: [
        "Vendor Balances",
        "Bills Details",
        "Vendor Credits Details",
        "Payments Made",
        "Purchase Order Details",
        "Purchase Orders by Vendor",
        "Payable Summary"
      ]
    },
    {
      title: "Purchases",
      icon: <ShoppingBag className="w-5 h-5" />,
      reports: [
        "Purchases by Item",
        "Receive History",
        "Billable Expense Details"
      ]
    }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reports</h1>
        <div className="flex items-center">
          <div className="relative mr-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search reports"
              className="pl-10 pr-4 py-2 border rounded-md"
            />
          </div>
          <Button variant="default">+ Create New Report</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <ReportCategory key={index} {...category} />
        ))}
      </div>
    </div>
  );
};

export default ReportsDashboard;
  
