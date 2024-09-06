import PackagesTable from '../../../../../components/dashboard/PackagesTable';

async function getPackages() {
  // In a real application, this would be an API call or database query
  return [
    { packageDate: '13 Sep 2023', packageNumber: 'PCK-00', carrier: '', trackingNumber: '', salesOrderNumber: 'SO-00', status: 'NOT SHIPPED', shipmentDate: '', customerName: 'Ewald', quantity: '0.00' },
    { packageDate: '14 Jan 2024', packageNumber: 'PCK-01', carrier: 'Australian Post', trackingNumber: '645261', salesOrderNumber: 'SO-01', status: 'DELIVERED', shipmentDate: '18 May 2025', customerName: 'Alisa', quantity: '0.00' },
    { packageDate: '7 Mar 2023', packageNumber: 'PCK-02', carrier: '', trackingNumber: '', salesOrderNumber: 'SO-02', status: 'NOT SHIPPED', shipmentDate: '', customerName: 'Lucius', quantity: '2.00' },
    { packageDate: '3 Sep 2024', packageNumber: 'PCK-03', carrier: '', trackingNumber: '', salesOrderNumber: 'SO-03', status: 'NOT SHIPPED', shipmentDate: '', customerName: 'Lucinda', quantity: '0.00' },
  ];
}

export const metadata = {
  title: 'Packages | Your Company Name',
  description: 'Manage your packages and shipments',
};

export default async function PackagesPage() {
  const packages = await getPackages();
  return <PackagesTable packages={packages} />;
}