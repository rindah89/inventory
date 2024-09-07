import AllVendorsTable from '../../../../../components/dashboard/AllVendorsTable';

async function getVendors() {
  // In a real application, this would be an API call or database query
  return [
    { name: 'Anne Schuppe', companyName: 'dolore', email: 'anne@example.com', workPhone: '123-456-7890', payables: '260', unusedCredits: '334' },
    { name: 'Edmond Predovic', companyName: 'assumenda', email: 'edmond@example.com', workPhone: '234-567-8901', payables: '919', unusedCredits: '210' },
    { name: 'Theodore Reichel', companyName: 'quos', email: 'theodore@example.com', workPhone: '345-678-9012', payables: '736', unusedCredits: '689' },
    { name: 'Billie Beahan', companyName: 'odit', email: 'billie@example.com', workPhone: '456-789-0123', payables: '765', unusedCredits: '472' },
    { name: 'Bethany Breitenberg', companyName: 'quia', email: 'bethany@example.com', workPhone: '567-890-1234', payables: '740', unusedCredits: '8' },
  ];
}

export const metadata = {
  title: 'All Vendors | Your Company Name',
  description: 'View and manage all vendors',
};

export default async function AllVendorsPage() {
  const vendors = await getVendors();

  return (
    <div className="container mx-auto py-8">
      <AllVendorsTable vendors={vendors} />
    </div>
  );
}