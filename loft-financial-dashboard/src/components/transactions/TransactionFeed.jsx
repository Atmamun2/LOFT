import React from 'react';
import TransactionItem from './TransactionItem';

const TransactionFeed = ({ transactions }) => {
  return (
    <div className="transaction-feed">
      <h3>Transaction History</h3>
      <ul className="list">
        {transactions.map(transaction => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </div>
  );
};

export default TransactionFeed;