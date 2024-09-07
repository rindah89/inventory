export default async function getAllVendors() {
    // In a real application, this would be an API call or database query
    return [
      { name: 'Anne Schuppe', companyName: 'dolore', email: 'anne@example.com', workPhone: '123-456-7890', payables: '260', unusedCredits: '334' },
      { name: 'Edmond Predovic', companyName: 'assumenda', email: 'edmond@example.com', workPhone: '234-567-8901', payables: '919', unusedCredits: '210' },
      // ... more vendor data
    ];
  }