import AllCreditNotesTable from '../../../../../components/dashboard/AllCreditNotesTable';

async function getCreditNotes() {
  // In a real application, this would be an API call or database query
  return [
    { date: '9 May 2024', creditNoteNumber: 'CN-70868', referenceNumber: '76433', customerName: 'Melyssa', invoiceNumber: 'INV-85420', status: 'OPEN', amount: '607.00', balance: '81094243', hasAttachment: true },
    { date: '30 Sep 2023', creditNoteNumber: 'CN-71056', referenceNumber: '87617', customerName: 'Emory', invoiceNumber: 'INV-60781', status: 'APPROVED', amount: '535.00', balance: '13324436', hasAttachment: true },
    { date: '1 Dec 2023', creditNoteNumber: 'CN-32626', referenceNumber: '26565', customerName: 'Francisco', invoiceNumber: 'INV-38232', status: 'OPEN', amount: '904.00', balance: '34635839', hasAttachment: false },
    { date: '15 Mar 2024', creditNoteNumber: 'CN-67189', referenceNumber: '20919', customerName: 'Chasity', invoiceNumber: 'INV-2053', status: 'CLOSED', amount: '634.00', balance: '31060093', hasAttachment: true },
    { date: '16 Apr 2024', creditNoteNumber: 'CN-58262', referenceNumber: '87431', customerName: 'Kurtis', invoiceNumber: 'INV-58476', status: 'PENDING APPROVAL', amount: '858.00', balance: '2742324', hasAttachment: true },
  ];
}

export const metadata = {
  title: 'All Credit Notes | Your Company Name',
  description: 'View and manage all credit notes',
};

export default async function AllCreditNotesPage() {
  const creditNotes = await getCreditNotes();

  return (
    <div className="container mx-auto py-8">
      <AllCreditNotesTable creditNotes={creditNotes} />
    </div>
  );
}