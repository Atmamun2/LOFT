import { useTransactions } from './hooks/useTransactions';
import { useFinancialStatements } from './hooks/useFinancialStatements';
import Header from './components/layout/Header';
import TransactionFeed from './components/transactions/TransactionFeed';
import TransactionForm from './components/transactions/TransactionForm';
import BalanceSheet from './components/financial-statements/BalanceSheet';
import IncomeStatement from './components/financial-statements/IncomeStatement';
import CashFlowStatement from './components/financial-statements/CashFlowStatement';
import './App.css';

function App() {
  const { transactions, addTransaction, networkState } = useTransactions();
  const financials = useFinancialStatements(transactions);

  return (
    <div className="app">
      <Header networkState={networkState} />
      
      <div className="app-layout">
        {/* Left Sidebar - Transaction Input */}
        <div className="sidebar">
          <TransactionForm onSubmit={addTransaction} />
          <TransactionFeed transactions={transactions} />
        </div>
        
        {/* Main Content - Financial Statements */}
        <div className="main-content">
          <div className="financial-grid">
            <BalanceSheet data={financials.balanceSheet} />
            <IncomeStatement data={financials.incomeStatement} />
            <CashFlowStatement data={financials.cashFlow} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;