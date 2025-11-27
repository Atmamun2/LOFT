import React from 'react';

const TransactionItem = ({ transaction }) => {
  const sign = transaction.type === 'INCOME' ? '+' : '-';
  const itemClass = transaction.type === 'INCOME' ? 'plus' : 'minus';

  return (
    <li className={itemClass}>
      {transaction.description}
      <span>{sign}${Math.abs(transaction.amount)}</span>
    </li>
  );
};

export default TransactionItem;