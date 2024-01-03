import { useState, useEffect } from 'react';

interface Transaction {
  // Define the structure of your transaction object
  // based on what your API returns
  // Example:
  id: number;
  amount: number;
  // ... other fields
}

const useTransactions = (address: string | undefined) => {
  // State to hold the fetched transactions
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  // State to handle loading state
  const [loading, setLoading] = useState(true);
  // State to handle error state
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
        if(address){
            try {
                // Fetch data from the API
            
                const response = await fetch(`/api/transactions?ethAddress=${address}`); // Update the API endpoint accordingly
                const data = await response.json();
        
                // Check if the request was successful
                if (response.ok) {
                  setTransactions(data.transactions);
                } else {
                  // Handle API error
                  setError(data.message || 'Failed to fetch transactions');
                }
              } catch (error) {
                // Handle general fetch error
                setError('Failed to fetch transactions');
              } finally {
                // Set loading to false once the request is complete
                setLoading(false);
              }
        }
        else{
            try {
                // Fetch data from the API
            
                const response = await fetch(`/api/transactions`); // Update the API endpoint accordingly
                const data = await response.json();
        
                // Check if the request was successful
                if (response.ok) {
                setTransactions(data.transactions);
                } else {
                // Handle API error
                setError(data.message || 'Failed to fetch transactions');
                }
            } catch (error) {
                // Handle general fetch error
                setError('Failed to fetch transactions');
            } finally {
                // Set loading to false once the request is complete
                setLoading(false);
            }
        }
    };

    // Call the fetch function
    fetchData();
  }, []); // Empty dependency array ensures that this effect runs once when the component mounts

  return { transactions, loading, error };
};

export default useTransactions;