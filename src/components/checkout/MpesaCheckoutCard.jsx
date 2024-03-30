import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const MpesaCheckoutCard = ({ transaction, handleConfirmClick }) => {
    // Function to format the timestamp
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
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-md bg-gradient-to-r from-violet-100 to-indigo-100 p-6 rounded-lg">
    {transaction?<div className='grid grid-cols-2'>
      <div className="mb-4">
        <p className="font-bold">Transaction ID:</p>
        <p>{transaction.TransID}</p>
      </div>
      <div className="mb-4">
        <p className="font-bold">Transaction Type:</p>
        <p>{transaction.TransactionType}</p>
      </div>
      <div className="mb-4">
        <p className="font-bold">Name:</p>
        <p>{transaction.FirstName} {transaction.MiddleName} {transaction.LastName}</p>
      </div>
      <div className="mb-4">
        <p className="font-bold">Number:</p>
        <p>{transaction.MSISDN}</p>
      </div>
      <div className="mb-4">
        <p className="font-bold">Amount:</p>
        <p>{transaction.TransAmount}</p>
      </div>
      <div className="mb-4">
        <p className="font-bold">Time:</p>
        <p>{formatTimestamp((transaction.TransTime))}</p>
      </div>
      <button onClick={()=>handleConfirmClick(true)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Confirm</button>
    </div>:
    <div>
        <p>Awaiting Transaction Details...</p>
        <div className='flex items-center justify-center'>
            <FontAwesomeIcon spinPulse icon={faSpinner}/>
        </div>
    </div>}
    </div>
  );
};

export default MpesaCheckoutCard;
