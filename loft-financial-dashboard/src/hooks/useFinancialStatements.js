import { useMemo } from 'react';
import {
  calculateBalanceSheet,
  calculateIncomeStatement,
  calculateCashFlow
} from '../utils/transactionCalculations';

export const useFinancialStatements = (transactions) => {
  const financialData = useMemo(() => {
    const balanceSheet = calculateBalanceSheet(transactions);
    const incomeStatement = calculateIncomeStatement(transactions);
    const cashFlow = calculateCashFlow(transactions);

    return { balanceSheet, incomeStatement, cashFlow };
  }, [transactions]);

  return financialData;
};