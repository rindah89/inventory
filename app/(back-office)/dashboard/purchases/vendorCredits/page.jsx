import AllVendorCreditsTable from '../../../../../components/dashboard/AllVendorCreditsTable';

async function getVendorCredits() {
  // In a real application, this would be an API call or database query
  return [
    { date: '31 May 2024', creditNoteNumber: '13575', referenceNumber: '77371', vendorName: 'Hugh', status: 'VOID', amount: '445.00', balance: '320.00' },
    { date: '31 May 2024', creditNoteNumber: '65438', referenceNumber: '73914', vendorName: 'Sterling', status: 'CLOSED', amount: '119.00', balance: '930.00' },
    { date: '31 May 2024', creditNoteNumber: '46623', referenceNumber: '52020', vendorName: 'Francis', status: 'VOID', amount: '15.00', balance: '205.00' },
    { date: '31 May 2024', creditNoteNumber: '48825', referenceNumber: '58369', vendorName: 'Daisha', status: 'DRAFT', amount: '302.00', balance: '294.00' },
  ];
}

export const metadata = {
  title: 'All Vendor Credits | Your Company Name',
  description: 'View and manage all vendor credits',
};

export default async function AllVendorCreditsPage() {
  const vendorCredits = await getVendorCredits();

  return (
    <div className="container mx-auto py-8">
      <AllVendorCreditsTable vendorCredits={vendorCredits} />
    </div>
  );
}