import React from 'react';
import FinancialStatementCard from './FinancialStatementCard';

const BalanceSheet = ({ data }) => {
  if (!data) return null;

  const { assets, liabilities, equity, netWorth } = data;

  return (
    <FinancialStatementCard title="Balance Sheet">
      <div className="statement-section">
        <h4>Assets</h4>
        <p>Cash: ${assets.cash.toFixed(2)}</p>
        <p>Equipment: ${assets.equipment.toFixed(2)}</p>
        <p><strong>Total Assets: ${assets.total.toFixed(2)}</strong></p>
      </div>
      <div className="statement-section">
        <h4>Liabilities</h4>
        <p>Loans: ${liabilities.loans.toFixed(2)}</p>
        <p><strong>Total Liabilities: ${liabilities.total.toFixed(2)}</strong></p>
      </div>
      <div className="statement-section">
        <h4>Equity</h4>
        <p><strong>Total Equity: ${equity.toFixed(2)}</strong></p>
      </div>
      <hr />
      <div className="statement-total">
        <strong>Net Worth: ${netWorth.toFixed(2)}</strong>
      </div>
    </FinancialStatementCard>
  );
};

export default BalanceSheet;