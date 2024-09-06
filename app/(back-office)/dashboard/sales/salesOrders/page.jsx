import SalesOrdersTable from '../../../../../components/dashboard/SalesOrder';

async function getSalesOrders() {
  // In a real application, this would be an API call or database query
  return [
    { id: 1, date: '15 Sep 2023', salesOrder: 'SO-00', reference: '28122', customerName: 'Lawrence Kuhn', status: 'OVERDUE', amount: '2407', invoiced: false },
    { id: 2, date: '15 Sep 2023', salesOrder: 'SO-01', reference: '40264', customerName: 'Jeannie Schroeder II', status: 'DRAFT', amount: '46474', invoiced: false },
    { id: 3, date: '15 Sep 2023', salesOrder: 'SO-02', reference: '89265', customerName: 'Mona Anderson', status: 'APPROVED', amount: '85511', invoiced: false },
  ];
}

export const metadata = {
  title: 'Sales Orders | Your Company Name',
  description: 'Manage your sales orders',
};

export default async function SalesOrdersPage() {
   
  return <SalesOrdersTable orders={orders} />;
}