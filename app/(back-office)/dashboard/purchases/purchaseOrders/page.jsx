import AllPurchaseOrdersTable from '../../../../../components/dashboard/AllPurchaseOrdersTable';

async function getPurchaseOrders() {
  // In a real application, this would be an API call or database query
  return [
    { date: '28 Mar 2024', purchaseOrderNumber: 'PO-81164', referenceNumber: '22352', vendorName: 'Anne Schuppe', status: 'OPEN', amount: '89833' },
    { date: '2 Dec 2023', purchaseOrderNumber: 'PO-85910', referenceNumber: '89371', vendorName: 'Edmond Predovic', status: 'CLOSED', amount: '8800' },
    { date: '23 Apr 2024', purchaseOrderNumber: 'PO-84508', referenceNumber: '94118', vendorName: 'Theodore Reichel', status: 'CANCELLED', amount: '46772' },
    { date: '14 Jun 2024', purchaseOrderNumber: 'PO-88108', referenceNumber: '66736', vendorName: 'Billie Beahan', status: 'DRAFT', amount: '57931' },
    { date: '14 Apr 2024', purchaseOrderNumber: 'PO-69952', referenceNumber: '46160', vendorName: 'Bethany Breitenberg', status: 'OPEN', amount: '72521' },
  ];
}

export const metadata = {
  title: 'All Purchase Orders | Your Company Name',
  description: 'View and manage all purchase orders',
};

export default async function AllPurchaseOrdersPage() {
  const purchaseOrders = await getPurchaseOrders();

  return (
    <div className="container mx-auto py-8">
      <AllPurchaseOrdersTable purchaseOrders={purchaseOrders} />
    </div>
  );
}