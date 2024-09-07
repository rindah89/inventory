import PendingSalesReturnsTable from '../../../../../components/dashboard/SalesReturns';

async function getSalesReturns() {
  // In a real application, this would be an API call or database query
  return [
    { date: '15 Apr 2024', rmaNumber: 'RMA-00', salesOrderNumber: 'SO-00', customerName: 'Kaley', status: 'APPROVED', receiveStatus: '', refundStatus: '', returned: '' },
    { date: '15 Apr 2024', rmaNumber: 'RMA-01', salesOrderNumber: 'SO-01', customerName: 'Edgardo', status: 'APPROVED', receiveStatus: '', refundStatus: '', returned: '' },
    { date: '15 Apr 2024', rmaNumber: 'RMA-02', salesOrderNumber: 'SO-02', customerName: 'Davin', status: 'APPROVED', receiveStatus: '', refundStatus: '', returned: '' },
  ];
}

export const metadata = {
  title: 'Pending Sales Returns | Your Company Name',
  description: 'View and manage pending sales returns',
};

export default async function PendingSalesReturnsPage() {
  const salesReturns = await getSalesReturns();

  return (
    <div className="container mx-auto py-8">
      <PendingSalesReturnsTable salesReturns={salesReturns} />
    </div>
  );
}