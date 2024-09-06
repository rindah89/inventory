import React from 'react'
import KanbanBoard from './kanban';

const initialPackages = {
    not_shipped: {
      title: "Packages, Not Shipped",
      items: [
        { id: '1', name: 'Harold', packageId: 'PCK-00', orderId: 'SO-00', date: '14 Sep 2023', cost: '0.00' },
        { id: '2', name: 'Coby', packageId: 'PCK-02', orderId: 'SO-02', date: '26 Nov 2022', cost: '2.00' },
      ]
    },
    shipped: {
      title: "Shipped Packages",
      items: [
        { id: '3', name: 'Rebecca', packageId: 'PCK-01', orderId: 'SO-01', date: '16 Jan 2024', courier: 'FedEx', cost: '0.00' },
        { id: '4', name: 'Estevan', packageId: 'PCK-03', orderId: 'SO-03', date: '4 Jan 2024', courier: 'FedEx', cost: '0.00' },
      ]
    },
    delivered: {
      title: "Delivered Packages",
      items: []
    }
  };

export default function page(intialPackages) {

    
  return (
<KanbanBoard/>
  )
}
