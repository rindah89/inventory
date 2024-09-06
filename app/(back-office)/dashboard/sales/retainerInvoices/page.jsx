import RetainerInvoicesTable from '../../../../../components/dashboard/RetainerInvoice';

async function getInvoices() {
  // In a real application, this would be an API call or database query
  return [
    { id: 1, date: '15 Jul 2024', retainerInvoiceNumber: 'eos', reference: '', customerName: 'Lawrence Kuhn', projectEstimate: '--', status: 'PAID', amount: 30453, balance: 0 },
    { id: 2, date: '15 Jul 2024', retainerInvoiceNumber: 'natus', reference: '', customerName: 'Jeannie Schroeder II', projectEstimate: '--', status: 'PAID', amount: 30453, balance: 0 },
    { id: 3, date: '15 Jul 2024', retainerInvoiceNumber: 'unde', reference: '', customerName: 'Mona Anderson', projectEstimate: '--', status: 'PAID', amount: 30453, balance: 0 },
  ];
}

export const metadata = {
  title: 'Retainer Invoices | Your Company Name',
  description: 'Manage your retainer invoices',
};

export default async function RetainerInvoicesPage() {
  const invoices = await getInvoices();

  return <RetainerInvoicesTable invoices={invoices} />;
}