import InvoicesTable from '../../../../../components/dashboard/InvoicesTable';
import PaymentSummary from '../../../../../components/dashboard/InvoicesPaymentSummary';

async function getInvoices() {
  // In a real application, this would be an API call or database query
  return [
    { date: '13 Mar 2024', invoiceNumber: 'Invoice1', orderNumber: '', customerName: 'Cathy Mohr', status: 'DRAFT', dueDate: '26 Jan 2025', amount: '597324', balanceDue: '597324' },
    { date: '13 Mar 2024', invoiceNumber: 'Invoice2', orderNumber: '', customerName: 'Cathy Mohr', status: 'PARTIALLY PAID', dueDate: '26 Jan 2025', amount: '23624', balanceDue: '23614' },
    { date: '13 Mar 2024', invoiceNumber: 'Invoice3', orderNumber: '', customerName: 'Cathy Mohr', status: 'OPEN', dueDate: '26 Jan 2025', amount: '241606', balanceDue: '241606' },
    { date: '13 Mar 2024', invoiceNumber: 'Invoice4', orderNumber: '', customerName: 'Cathy Mohr', status: 'PAID', dueDate: '26 Jan 2025', amount: '880359', balanceDue: '880359' },
    { date: '13 Mar 2024', invoiceNumber: 'Invoice5', orderNumber: '', customerName: 'Judah', status: 'PAID', dueDate: '26 Jan 2025', amount: '316813', balanceDue: '316813' },
    { date: '13 Mar 2024', invoiceNumber: 'Invoice6', orderNumber: '', customerName: 'Theodore', status: 'OVERDUE', dueDate: '26 Jan 2025', amount: '711508', balanceDue: '711508' },
    { date: '13 Mar 2024', invoiceNumber: 'Invoice7', orderNumber: '', customerName: 'Jazmyne', status: 'APPROVED', dueDate: '26 Jan 2025', amount: '142609', balanceDue: '142609' },
    { date: '13 Mar 2024', invoiceNumber: 'Invoice8', orderNumber: '', customerName: 'Bobby', status: 'PENDING APPROVAL', dueDate: '26 Jan 2025', amount: '920349', balanceDue: '920349' },
    { date: '13 Mar 2024', invoiceNumber: 'Invoice9', orderNumber: '', customerName: 'Karianne', status: 'PARTIALLY PAID', dueDate: '26 Jan 2025', amount: '324444', balanceDue: '324444' },
    { date: '13 Mar 2024', invoiceNumber: 'Invoice10', orderNumber: '', customerName: 'Chad Leuschke', status: 'DRAFT', dueDate: '26 Jan 2025', amount: '813989', balanceDue: '813989' },
    { date: '13 Mar 2024', invoiceNumber: 'Invoice11', orderNumber: '', customerName: 'Chad Leuschke', status: 'PARTIALLY PAID', dueDate: '26 Jan 2025', amount: '23624', balanceDue: '23614' },
    { date: '13 Mar 2024', invoiceNumber: 'Invoice12', orderNumber: '', customerName: 'Chad Leuschke', status: 'PARTIALLY PAID', dueDate: '26 Jan 2025', amount: '902341', balanceDue: '902341' },
  ];
}

async function getPaymentSummary() {
  // In a real application, this would be an API call or database query
  return {
    totalOutstanding: '672.19',
    dueToday: '0.00',
    dueWithin30Days: '0.00',
    averageDaysForPayment: 0,
  };
}

export const metadata = {
  title: 'Invoices | Your Company Name',
  description: 'Manage your invoices and payments',
};

export default async function InvoicesPage() {
  const invoices = await getInvoices();
  const paymentSummary = await getPaymentSummary();

  return (
    <div className="container mx-auto py-8">
      <PaymentSummary summary={paymentSummary} />
      <InvoicesTable invoices={invoices} />
    </div>
  );
}