import { useState, useEffect } from 'react';
import { Transaction, columns } from "../app/transactions/columns"


const useAllTransactions = () => {
    // State to hold the fetched transactions
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    // State to handle loading state
    const [loading, setLoading] = useState(true);
    // State to handle error state
    const [error, setError] = useState<string | null>(null);

    const refreshTransactions = async () =>{
      try {
        // Fetch data from the API
    
        const response = await fetch(`/api/transactions`); // Update the API endpoint accordingly
        const data = await response.json();

        //console.log(data)

        // Check if the request was successful
        if (response.ok) {
          setTransactions(data.sortedTxs);
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
  
    useEffect(() => {
      const fetchData = async () => {
       
            try {
              // Fetch data from the API
          
              const response = await fetch(`/api/transactions`); // Update the API endpoint accordingly
              const data = await response.json();
  
              //console.log(data)
      
              // Check if the request was successful
              if (response.ok) {
                setTransactions(data.sortedTxs);
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
       
         
      };
  
      // Call the fetch function
      fetchData();
    }, []); // Empty dependency array ensures that this effect runs once when the component mounts
  
    return { transactions, loading, error, refreshTransactions };
  };
  
  export default useAllTransactions;