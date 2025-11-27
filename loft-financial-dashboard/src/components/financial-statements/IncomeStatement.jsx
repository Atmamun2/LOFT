import React from 'react';
import FinancialStatementCard from './FinancialStatementCard';

const IncomeStatement = ({ data }) => {
  if (!data) return null;

  const { revenue, expenses, netIncome } = data;

  return (
    <FinancialStatementCard title="Income Statement">
      <div className="statement-section">
        <p>Revenue: <span>${revenue.toFixed(2)}</span></p>
        <p>Expenses: <span>${expenses.toFixed(2)}</span></p>
      </div>
      <hr />
      <div className="statement-total">
        <strong>Net Income: ${netIncome.toFixed(2)}</strong>
      </div>
    </FinancialStatementCard>
  );
};

export default IncomeStatement;