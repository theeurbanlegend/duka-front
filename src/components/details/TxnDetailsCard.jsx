import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const TransactionDetailsCard = ({ transaction, setTxnSelected }) => {
  const { payment_type, payment_details, tx_total, tx_type, createdAt, tx_details,served_by } = transaction;
  const { tx_time, amnt_paid, cus_name, cus_no } = payment_details || {};
  const formatTimestamp = (timestamp) => {
    const year = timestamp.slice(0, 4);
    const month = timestamp.slice(4, 6);
    const date = timestamp.slice(6, 8);
    const hour = timestamp.slice(8, 10);
    const minute = timestamp.slice(10, 12);
    const second = timestamp.slice(12, 14);

    return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
  };
  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white dark:bg-gray-500 shadow-md rounded-lg px-8 py-6 max-w-md">
      <FontAwesomeIcon icon={faTimes} size='xl' className='absolute right-6 cursor-pointer' onClick={() => setTxnSelected(null)} />
        <h1 className="text-2xl font-bold text-left mb-4 dark:text-gray-200">Transaction Details</h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4 flex flex-col">
            <label htmlFor="txType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Transaction Type</label>
            <div id="txType">{payment_type}</div>
          </div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="txTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Transaction Time</label>
            <div id="txTime">{new Date(createdAt).toLocaleString()}</div>
          </div>
          {payment_type === 'mpesa' && (
            <>
              <div className="mb-1 flex flex-col">
                <label htmlFor="amntPaid" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Amount Paid</label>
                <div id="amntPaid">{amnt_paid}</div>
              </div>
              <div className="mb-1 flex flex-col">
                <label htmlFor="cusName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Customer Name</label>
                <div id="cusName">{cus_name}</div>
              </div>
              <div className="mb-1 flex flex-col">
                <label htmlFor="cusNo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Customer Number</label>
                <div id="cusNo">{cus_no}</div>
              </div>
            </>
          )}
          <div className="mb-1 flex flex-col">
            <label htmlFor="txTotal" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Transaction Total</label>
            <div id="txTotal">{tx_total}</div>
          </div>
          <div className="mb-1 flex flex-col">
            <label htmlFor="servedBy" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Served By</label>
            <div id="servedBy">{served_by.name}</div>
          </div>
        </div>
        
        {/* Transaction Details Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 mt-6">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock In</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Out</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Retail</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sold at</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profit</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tx_details.map((detail, index) => (
                <tr key={index} className="bg-white">
                  <td className="px-6 py-4 whitespace-nowrap">{detail.item_affected.item_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{detail.stock_in}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{detail.stock_out}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{detail.retail}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{detail.selling_price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{detail.profit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailsCard;
