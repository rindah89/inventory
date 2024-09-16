import React from 'react'
import EditItem from '../../../../../../components/dashboard/editItem'


async function getData(itemId) {
    console.log("Attempting to fetch item with ID:", itemId);
    
    try {
      const data = await prisma.item.findFirst({
        where: {
          id: itemId
        }
      });
  
      console.log("Query result:", data);
  
      if (!data) {
        console.log("Item not found");
        notFound();
      }
  
      return data;
    } catch (error) {
      console.error("Error in getData:", error);
      throw error;
    }
  }
  
  export default async function EditRoute({ params }) {
    console.log("Received params:", params);
    
    try {
      if (!params.id) {
        throw new Error("No item ID provided");
      }
  
      const data = await getData(params.id);
  
      return (
        <div>
          <EditItem initialData={data} />
        </div>
      );
    } catch (error) {
      console.error("Error in EditRoute:", error);
      return <div>An error occurred: {error.message}</div>;
    }
  }