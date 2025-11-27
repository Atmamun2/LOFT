import React, { useState } from 'react';

const TransactionForm = ({ onSubmit }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('INCOME');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) {
      alert('Please fill in all fields.');
      return;
    }
    onSubmit({ description, amount: parseFloat(amount), type });
    setDescription('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <h3>Add New Transaction</h3>
      <div className="form-control">
        <label>Description</label>
        <input 
          type="text" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Enter description..." 
        />
      </div>
      <div className="form-control">
        <label>Amount</label>
        <input 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          placeholder="Enter amount..." 
        />
      </div>
      <div className="form-control">
        <label>Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="INCOME">Income</option>
          <option value="EXPENSE">Expense</option>
          <option value="ASSET_PURCHASE">Asset Purchase</option>
          <option value="LIABILITY_INC">Liability Increase</option>
        </select>
      </div>
      <button className="btn">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;