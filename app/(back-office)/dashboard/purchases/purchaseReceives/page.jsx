import InTransitReceivesTable from '../../../../../components/dashboard/InTransitReceivesTable';

async function getInTransitReceives() {
  // In a real application, this would be an API call or database query
  return [
    { date: '10 Aug 2024', purchaseReceiveNumber: 'PR-9885', purchaseOrderNumber: 'PO-81164', vendorName: 'Anne Schuppe', status: 'Received', quantity: '91045' },
    { date: '24 Aug 2024', purchaseReceiveNumber: 'PR-91026', purchaseOrderNumber: 'PO-85910', vendorName: 'Edmond Predovic', status: 'Billed', quantity: '81297' },
    { date: '24 Jul 2024', purchaseReceiveNumber: 'PR-81064', purchaseOrderNumber: 'PO-84508', vendorName: 'Theodore Reichel', status: 'Billed', quantity: '38400' },
    { date: '17 Sep 2023', purchaseReceiveNumber: 'PR-42335', purchaseOrderNumber: 'PO-88108', vendorName: 'Billie Beahan', status: 'Received', quantity: '29880' },
    { date: '12 May 2024', purchaseReceiveNumber: 'PR-17858', purchaseOrderNumber: 'PO-69952', vendorName: 'Bethany Breitenberg', status: 'Received', quantity: '98606' },
  ];
}

export const metadata = {
  title: 'In Transit Receives | Your Company Name',
  description: 'View and manage in transit receives',
};

export default async function InTransitReceivesPage() {
  const receives = await getInTransitReceives();

  return (
    <div className="container mx-auto py-8">
      <InTransitReceivesTable receives={receives} />
    </div>
  );
}