import AllPaymentsTable from '../../../../../components/dashboard/PaymentsMade';

async function getPayments() {
  // In a real application, this would be an API call or database query
  return [
    { date: '5 Sep 2024', paymentNumber: '15622', referenceNumber: '54835', vendorName: 'Naomie', billNumber: '37485', mode: 'Forte', amount: '425.00', unusedAmount: '80.00', hasAttachment: true },
    { date: '5 Sep 2024', paymentNumber: '60488', referenceNumber: '8529', vendorName: 'Edna', billNumber: '89178', mode: 'Kotak Mahindra Bank', amount: '810.00', unusedAmount: '304.00', hasAttachment: true },
    { date: '5 Sep 2024', paymentNumber: '14410', referenceNumber: '3271', vendorName: 'Lazaro', billNumber: '22099', mode: 'HSBC Bank', amount: '210.00', unusedAmount: '181.00', hasAttachment: false },
    { date: '5 Sep 2024', paymentNumber: '76593', referenceNumber: '62764', vendorName: 'Willie', billNumber: '50297', mode: 'Forte', amount: '150.00', unusedAmount: '785.00', hasAttachment: true },
  ];
}

export const metadata = {
  title: 'All Payments | Your Company Name',
  description: 'View and manage all payments',
};

export default async function AllPaymentsPage() {
  const payments = await getPayments();

  return (
    <div className="container mx-auto py-8">
      <AllPaymentsTable payments={payments} />
    </div>
  );
}