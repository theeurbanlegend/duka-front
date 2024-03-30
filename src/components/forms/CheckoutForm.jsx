import React, { useCallback, useContext, useEffect, useState } from "react";
import CheckoutCardItem from "../checkout/CheckoutCardItem";
import CheckoutTotalCard from "../checkout/CheckoutTotalCard";
import CheckoutHeader from "../checkout/CheckoutHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faSpinner } from "@fortawesome/free-solid-svg-icons";
import CheckoutList from "../checkout/CheckoutList";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config/config";
import { io } from "socket.io-client";
import { childContext } from "../../App";
import useAuth from "../features/useAuth";
import MpesaCheckoutCard from "../checkout/MpesaCheckoutCard";

const CheckoutForm = () => {
  const [checkoutCardList, setCheckoutCardList] = useState([])
  const socket = io(API_URL, { autoConnect: false })
  const [transaction, setTransaction] = useState(null)
  const { session } = useContext(childContext)
  const { sub } = useAuth(session[0])
  const navigate = useNavigate()
  const [unitTotal, setunitTotal] = useState(0)
  const [profit, setProfit] = useState(0)
  const [checkoutTotal, setcheckoutTotal] = useState(0)
  const [drugSelected, setDrugSelected] = useState(null);
  const [isAdding, setisAdding] = useState(false);
  const [submitting, isSubmitting] = useState(false)
  const [status, setStatus] = useState("PERFORM CHECKOUT")
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isMpesaModalOpen, setIsMpesaModalOpen] = useState(false)
  useEffect(() => {
    socket.connect()
    socket.emit('joinRoom', 'txnReceiver'); // Join the room as a receiver
    socket.on('obtainedTxnDetails', handleTxnDetails);

    return () => {
      socket.off('obtainedTxnDetails', handleTxnDetails);
    };

  }, [])
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };
  const handleAdd = () => {
    setisAdding(true);
  };

  const handleTxnDetails = (details) => {
    setTransaction(details)
  }

  const handleCheckout = async () => {
    if (checkoutCardList.length === 0) {
      setStatus("NO ITEMS DETECTED")
      setTimeout(() => { setStatus("PERFORM CHECKOUT") }, 1000)
      return
    }
    isSubmitting(true)
    setStatus(<FontAwesomeIcon spinPulse icon={faSpinner} />)
    let total = 0
    const tx_details_list = checkoutCardList.map(item => {
      const { item_affected, in_stock, stock_out, profit, checkout_price } = item;
      total += Number(checkout_price)
      return { item_affected, stock_in: in_stock, stock_out, profit };
    });
    const data = {
      tx_type: 'checkout',
      tx_details: tx_details_list,
      payment_type: 'cash',
      served_by: sub,
      tx_total: total
    }


    try {
      if (paymentMethod === 'cash') {
        console.log('paying by cash')
        const res = await axios.post(`${API_URL}/drug/checkout`, data)
        setCheckoutCardList([])
        setDrugSelected(null)
        setProfit(0)
        setcheckoutTotal(0)
        isSubmitting(false)
        setStatus("TRANSACTION SUCCESS")
        setTimeout(() => { setStatus("PERFORM CHECKOUT") }, 1000)
      } else {
        console.log('paying by mpesa')
        setIsMpesaModalOpen(true)
      }
    } catch (err) {
      isSubmitting(false)
      setStatus("AN ERROR OCCURED")
      console.log(err)
      setTimeout(() => { setStatus("PERFORM CHECKOUT") }, 2000)
    }
  }
  const handleConfirmClick = async () => {
    
    let total = 0
    const tx_details_list = checkoutCardList.map(item => {
      const { item_affected, in_stock, stock_out, profit, checkout_price } = item;
      total += Number(checkout_price)
      return { item_affected, stock_in: in_stock, stock_out, profit };
    });
    const { TransID, TransactionType, FirstName, MiddleName, TransAmount,LastName, TransTime, MSISDN } = transaction;
    const data = {
      tx_type: 'checkout',
      tx_details: tx_details_list,
      payment_type: 'mpesa',
      payment_details:{
        tx_id:TransID,
        tx_type:TransactionType,
        tx_time:TransTime,
        amnt_paid:TransAmount,
        cus_name:`${FirstName} ${MiddleName} ${LastName}`,
        cus_no:MSISDN
      },
      served_by: sub,
      tx_total: total
    }
    try {
      // Close the modal first
      setIsMpesaModalOpen(false);
      const res = await axios.post(`${API_URL}/drug/checkout`, data)
      setCheckoutCardList([])
      setDrugSelected(null)
      setProfit(0)
      setcheckoutTotal(0)
      isSubmitting(false)
      setStatus("TRANSACTION SUCCESS")
      setTimeout(() => { setStatus("PERFORM CHECKOUT") }, 1000)
    } catch (err) {
      isSubmitting(false)
      setStatus('ERROR ADDING..')
      setTimeout(() => { setStatus("PERFORM CHECKOUT") }, 1000)
      console.log(err)
    }
  }
  const handleUpdate = (details) => {
    const exists = checkoutCardList.some(item => item._id === details.drugId);

    if (exists) {
      setCheckoutCardList(prevList => prevList.map(item => {
        if (item._id === details.drugId) {
          const { unitsToCheckout, unitSellPrice, checkout } = details
          item.sell_price = Number(unitSellPrice)
          item.stock_out = item.in_stock - unitsToCheckout
          item.profit = checkout - (Number(item.sell_price) * unitsToCheckout)
          item.checkout_price = checkout
        }
        return item;
      }));
    }
  }
  useEffect(() => {
    const addToList = () => {
      const exists = checkoutCardList.length > 0 && checkoutCardList.some(item => item._id === drugSelected._id);
      if (!exists && drugSelected) {
        const { _id, item_name, retail_price, barcode_no, in_stock } = drugSelected
        drugSelected['stock_out'] = in_stock - 1
        drugSelected['item_affected'] = _id
        drugSelected['profit'] = 0
        drugSelected['checkout_price'] = retail_price
        setCheckoutCardList(prevList => [...prevList, drugSelected]);
      }
    };

    addToList()
  }, [drugSelected]);
  useEffect(() => {
    const updateStats = () => {
      if (checkoutCardList.length > 0) {
        let total = 0;
        let profit = 0;
        let checkout = 0;
        for (const item of checkoutCardList) {
          total += Number(item.retail_price)
          profit += Number(item.profit)
          checkout += Number(item.checkout_price)
        }
        setunitTotal(total)
        setProfit(profit)
        setcheckoutTotal(checkout)
      }
    }
    setTimeout(updateStats, 100)
  })
  return (
    <div className="relative min-w-screen min-h-screen bg-gray-50 py-5">
      <div className="px-5">
        <div className="mb-2">
          <a
            href="/dash"
            className="focus:outline-none hover:underline text-gray-500 text-sm"
          >
            <i className="mdi mdi-arrow-left text-gray-400"></i>Back
          </a>
        </div>
        <div className="mb-2">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-600">
            Drug Checkout
          </h1>
        </div>
        <div className="mb-5 text-gray-400">
          <a
            href="#"
            className="focus:outline-none hover:underline text-gray-500"
          >
            Home
          </a>{" "}
          / <span className="text-gray-600">Checkout</span>
        </div>
      </div>
      <div className="w-full bg-white border-t border-b border-gray-200 px-5 py-10 text-gray-800">
        <div className="w-full">
          <div className="-mx-3 md:flex items-start">
            <div className="px-3 md:w-7/12 lg:pr-10">
              <CheckoutHeader />
              {checkoutCardList.length > 0 &&
                checkoutCardList.map((item) => (
                  <CheckoutCardItem
                    key={item._id}
                    drugId={item._id}
                    drugName={item.item_name}
                    drugPrice={item.selling_price}
                    inStock={item.in_stock}
                    updateItem={handleUpdate}
                  />
                ))}

              {isAdding && (
                <CheckoutList
                  setisAdding={setisAdding}
                  setDrugSelected={setDrugSelected}
                />
              )}
              <div
                className="bg-gray-200 text-center rounded-md p-2 mb-2 cursor-pointer "
                onClick={handleAdd}
              >
                <FontAwesomeIcon icon={faAdd} />
              </div>
            </div>
            {isMpesaModalOpen && <MpesaCheckoutCard transaction={transaction} handleConfirmClick={handleConfirmClick} />}
            <div className="px-3 md:w-5/12">
              <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6">
                <div className="w-full flex-col mb-3 items-center">
                  <div className="flex space-x-4 mb-2">
                    <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
                      Payment Method
                    </label>
                    <select
                      id="paymentMethod"
                      name="paymentMethod"
                      value={paymentMethod}
                      onChange={handlePaymentMethodChange}
                      className="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      <option value="">Select a payment method</option>
                      <option value="cash">Cash</option>
                      <option value="mpesa">Mpesa</option>
                    </select>
                  </div>
                  <hr style={{ width: '100%' }} />
                  <CheckoutTotalCard unitTotal={unitTotal} profit={profit} totalCheckout={checkoutTotal} />
                </div>
              </div>
              <div>
                <button onClick={handleCheckout} disabled={submitting} className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-2 font-semibold">
                  {status}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default CheckoutForm;
