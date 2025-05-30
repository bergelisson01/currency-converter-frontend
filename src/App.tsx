import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Transaction {
  transactionId: number;
  userId: number;
  fromCurrency: string;
  toCurrency: string;
  fromValue: number;
  toValue: number;
  rate: number;
  timestamp: string;
}

const App: React.FC = () => {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('BRL');
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const userId = 1;
  const baseUrl = "https://currency-converter-api-jaya-3340416685c1.herokuapp.com/";

  const convertCurrency = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${baseUrl}/transactions/convert`, {
        userId,
        fromCurrency,
        toCurrency,
        fromValue: amount,
      });

      setResult(response.data.toValue);
      fetchTransactions(); // update transactions after conversion
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Conversion failed.');
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${baseUrl}/transactions?userId=${userId}`);
      setTransactions(response.data);
    } catch (err) {
      console.error('Failed to fetch transactions', err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 p-6 space-y-6">
      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md space-y-4">
        <h1 className="text-xl font-bold text-center">Currency Converter</h1>
        <div className="flex gap-2">
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="border p-2 rounded w-1/2"
          >
            <option value="USD">USD</option>
            <option value="BRL">BRL</option>
            <option value="EUR">EUR</option>
            <option value="JPY">JPY</option>
          </select>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="border p-2 rounded w-1/2"
          >
            <option value="USD">USD</option>
            <option value="BRL">BRL</option>
            <option value="EUR">EUR</option>
            <option value="JPY">JPY</option>
          </select>
        </div>
        <input
          data-testid="amount-input"
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="border p-2 rounded w-full"
          placeholder="Amount"
        />
        <button
          data-testid="convert-button"
          onClick={convertCurrency}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
        >
          {loading ? 'Converting...' : 'Convert'}
        </button>

        {result !== null && (
          <div className="text-center font-semibold text-green-600">
            Result: {result.toFixed(2)} {toCurrency}
          </div>
        )}
        {error && <div className="text-red-500 text-sm">{error}</div>}
      </div>

      {/* Transactions List */}
      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-3xl space-y-4">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>
        {transactions.length === 0 ? (
          <p className="text-sm text-gray-500">No transactions yet.</p>
        ) : (
          <ul className="space-y-2">
            {transactions.map((tx) => (
              <li key={tx.transactionId} className="border p-3 rounded text-sm">
                <strong>{tx.fromValue}</strong> {tx.fromCurrency} ➡️ <strong>{tx.toValue.toFixed(2)}</strong>{' '}
                {tx.toCurrency} @ {tx.rate.toFixed(4)} on {new Date(tx.timestamp).toLocaleString()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;
