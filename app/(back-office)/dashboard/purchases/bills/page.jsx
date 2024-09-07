import OverdueBillsTable from '../../../../../components/dashboard/Bills';

async function getOverdueBills() {
  // In a real application, this would be an API call or database query
  return [
    { date: '21 Feb 2024', billNumber: 'Bill-78330', referenceNumber: 'animi', vendorName: 'Leta', status: 'OVERDUE', dueDate: '25 Jun 2025', amount: '22.00228', balanceDue: '4.002279999999999', hasWarning: true },
    { date: '21 Feb 2024', billNumber: 'Bill-78330', referenceNumber: 'cupiditate', vendorName: 'Maud', status: 'APPROVAL OVERDUE', dueDate: '25 Jun 2025', amount: '423.00725', balanceDue: '248.00725' },
    { date: '21 Feb 2024', billNumber: 'Bill-78330', referenceNumber: 'molestias', vendorName: 'Johan', status: 'DRAFT', dueDate: '25 Jun 2025', amount: '134.00767', balanceDue: '55.007699999999994' },
    { date: '21 Feb 2024', billNumber: 'Bill-78330', referenceNumber: 'ipsa', vendorName: 'Sadye', status: 'DRAFT', dueDate: '25 Jun 2025', amount: '329.00539', balanceDue: '226.00538999999998' },
    { date: '21 Feb 2024', billNumber: 'Bill-78330', referenceNumber: 'laborum', vendorName: 'Jana', status: 'PAID', dueDate: '25 Jun 2025', amount: '337.00522', balanceDue: '20.00522000000001' },
    // ... add more bill data as needed
  ];
}

export const metadata = {
  title: 'Overdue Bills | Your Company Name',
  description: 'View and manage overdue bills',
};

export default async function OverdueBillsPage() {
  const bills = await getOverdueBills();

  return (
    <div className="container mx-auto py-8">
      <OverdueBillsTable bills={bills} />
    </div>
  );
}