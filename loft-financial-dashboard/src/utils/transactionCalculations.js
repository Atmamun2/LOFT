export const calculateIncomeStatement = (transactions) => {
  let revenue = 0;
  let expenses = 0;

  transactions.forEach(transaction => {
    if (transaction.type === 'INCOME') {
      revenue += transaction.amount;
    }
    if (transaction.type === 'EXPENSE') {
      expenses += transaction.amount;
    }
  });

  return { revenue, expenses, netIncome: revenue - expenses };
};

export const calculateCashFlow = (transactions) => {
  let operating = 0;
  let investing = 0;
  let financing = 0;

  transactions.forEach(transaction => {
    switch(transaction.type) {
      case 'INCOME':
        operating += transaction.amount;
        break;
      case 'EXPENSE':
        operating -= transaction.amount;
        break;
      case 'ASSET_PURCHASE':
        investing -= transaction.amount;
        break;
      case 'LIABILITY_INC':
        financing += transaction.amount;
        break;
    }
  });

  return { operating, investing, financing, netCashFlow: operating + investing + financing };
};

export const calculateBalanceSheet = (transactions) => {
  let assets = { cash: 0, equipment: 0, investments: 0 };
  let liabilities = { loans: 0, creditCards: 0 };
  let equity = 0;

  transactions.forEach(transaction => {
    switch(transaction.type) {
      case 'INCOME':
        assets.cash += transaction.amount;
        equity += transaction.amount;
        break;
      case 'EXPENSE':
        assets.cash -= transaction.amount;
        equity -= transaction.amount;
        break;
      case 'ASSET_PURCHASE':
        assets.cash -= transaction.amount;
        assets.equipment += transaction.amount;
        break;
      case 'LIABILITY_INC':
        assets.cash += transaction.amount;
        liabilities.loans += transaction.amount;
        break;
    }
  });

  return {
    assets: { ...assets, total: Object.values(assets).reduce((a, b) => a + b, 0) },
    liabilities: { ...liabilities, total: Object.values(liabilities).reduce((a, b) => a + b, 0) },
    equity: equity,
    netWorth: assets.total - liabilities.total
  };
};