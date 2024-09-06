import ShipmentsTable from '../../../../../components/dashboard/ShipmentTable';

async function getShipments() {
  // In a real application, this would be an API call or database query
  return [
    { date: '9 Aug 2025', shipmentOrder: 'SHP-00090', customerName: 'Antonette', salesOrder: 'SO-0120', package: 'PCK-01', carrier: 'Australian Post', tracking: '645260', status: 'DELIVERED', shippingRate: '$15.00' },
    // Add more shipment data as needed
  ];
}

export const metadata = {
  title: 'Shipments | Your Company Name',
  description: 'Manage your shipments and deliveries',
};

export default async function ShipmentsPage() {
  const shipments = await getShipments();
  return <ShipmentsTable shipments={shipments} />;
}