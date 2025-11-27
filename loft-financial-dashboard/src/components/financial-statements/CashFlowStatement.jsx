import React from 'react';
import FinancialStatementCard from './FinancialStatementCard';

const CashFlowStatement = ({ data }) => {
  if (!data) return null;

  const { operating, investing, financing, netCashFlow } = data;

  return (
    <FinancialStatementCard title="Cash Flow Statement">
      <div className="statement-section">
        <p>Operating Activities: <span>${operating.toFixed(2)}</span></p>
        <p>Investing Activities: <span>${investing.toFixed(2)}</span></p>
        <p>Financing Activities: <span>${financing.toFixed(2)}</span></p>
      </div>
      <hr />
      <div className="statement-total">
        <strong>Net Cash Flow: ${netCashFlow.toFixed(2)}</strong>
      </div>
    </FinancialStatementCard>
  );
};

export default CashFlowStatement;