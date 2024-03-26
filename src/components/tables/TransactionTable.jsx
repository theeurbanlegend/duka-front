import React from 'react';
import BarLoader from './BarLoader';

const TransactionTable = ({ txns }) => {
  return (
    <div className='flex-col items-top justify-center min-h-screen from-purple-200 via-purple-300 to-purple-500 bg-gradient-to-br '>
      <div className="flex-col items-top justify-center w-full overflow-x-auto">
        <table className="mt-0 w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">Tx Id</th>
              <th scope="col" className="py-3 px-6">Drug Sold</th>
              <th scope="col" className="py-3 px-6">Units</th>
              <th scope="col" className="py-3 px-6">Amount</th>
              <th scope="col" className="py-3 px-6">Date</th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="flex-col items-top justify-center w-full overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody col className="h-[300px] overflow-y-auto w-full">
            {txns && txns.length > 0 ? (
              txns.map((txn) => (
                <tr key={txn._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="py-4 px-6">{txn._id}</td>
                  <td className="py-4 px-6">
                    {txn.tx_details.map((detail, index) => (
                      <span key={index}>
                        {detail.item_affected.item_name}
                        {index < txn.tx_details.length - 1 && ', '}
                      </span>
                    ))}
                  </td>
                  <td className="py-4 px-6">
                    {txn.tx_details.map((detail, index) => (
                      <span key={index}>
                        {detail.stock_in-detail.stock_out}
                        {index < txn.tx_details.length - 1 && ', '}
                      </span>
                    ))}
                  </td>
                  <td className="py-4 px-6">{txn.tx_total}</td>
                  <td className="py-4 px-6">{new Date(txn.createdAt).toDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>
                  {txns && txns.length === 0 ? (
                    <div className='text-center text-black'>Add some txns to find them here</div>
                  ) : (
                    <BarLoader />
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionTable;
