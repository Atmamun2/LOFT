import { useState, useEffect } from 'react';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [networkState, setNetworkState] = useState('idle');

  const addTransaction = (transactionData) => {
    const newTransaction = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...transactionData,
      status: 'completed'
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
    setNetworkState('syncing');
    
    // Simulate network sync
    setTimeout(() => setNetworkState('synced'), 500);
  };

  return {
    transactions,
    addTransaction,
    networkState,
    isLoading: networkState === 'syncing'
  };
};