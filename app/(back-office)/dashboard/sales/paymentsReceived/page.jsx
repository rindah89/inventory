import ReceivedPaymentsTable from '@/components/ReceivedPaymentsTable';

async function getPayments() {
  // In a real application, this would be an API call or database query
  return [
    { date: '6 Sep 2024', branch: 'Head Office', paymentNumber: 'payment1', type: 'Invoice Payment', referenceNumber: '123456789', customerName: 'Cathy Mohr', invoiceNumber: 'Invoice2', mode: 'Square', amount: '10', unusedAmount: '0' },
    { date: '6 Sep 2024', branch: 'Head Office', paymentNumber: 'payment2', type: 'Retainer Payment', referenceNumber: '123456789', customerName: 'Cathy Mohr', invoiceNumber: '', mode: 'Square', amount: '23624', unusedAmount: '0' },
    { date: '6 Sep 2024', branch: 'Head Office', paymentNumber: 'payment3', type: 'Invoice Payment', referenceNumber: '123456789', customerName: 'Chad Leuschke', invoiceNumber: 'Invoice11', mode: 'Square', amount: '10', unusedAmount: '0' },
    { date: '6 Sep 2024', branch: 'Head Office', paymentNumber: 'payment4', type: 'Retainer Payment', referenceNumber: '123456789', customerName: 'Chad Leuschke', invoiceNumber: '', mode: 'Square', amount: '23624', unusedAmount: '0' },
    { date: '6 Sep 2024', branch: 'Head Office', paymentNumber: 'payment5', type: 'Invoice Payment', referenceNumber: '123456789', customerName: 'Mrs. Judith Bailey', invoiceNumber: 'Invoice20', mode: 'Forte', amount: '10', unusedAmount: '0' },
    { date: '6 Sep 2024', branch: 'Head Office', paymentNumber: 'payment6', type: 'Retainer Payment', referenceNumber: '', customerName: 'Mrs. Judith Bailey', invoiceNumber: '', mode: 'Cash', amount: '23624', unusedAmount: '0' },
  ];
}

export const metadata = {
  title: 'Received Payments | Your Company Name',
  description: 'View and manage all received payments',
};

export default async function ReceivedPaymentsPage() {
  const payments = await getPayments();

  return (
    <div className="container mx-auto py-8">
      <ReceivedPaymentsTable payments={payments} />
    </div>
  );
}