import React, { useCallback, useEffect, useState } from "react";
import CheckoutCardItem from "../checkout/CheckoutCardItem";
import CheckoutTotalCard from "../checkout/CheckoutTotalCard";
import CheckoutHeader from "../checkout/CheckoutHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import CheckoutList from "../checkout/CheckoutList";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const API_ENDPOINT = "http://localhost:3000"
  const [checkoutCardList, setCheckoutCardList] = useState([]);
  const navigate=useNavigate()
  const [unitTotal, setunitTotal] = useState(0)
  const [profit, setProfit] = useState(0)
  const [checkoutTotal, setcheckoutTotal] = useState(0)
  const [drugSelected, setDrugSelected] = useState(null);
  const [isAdding, setisAdding] = useState(false);
  const [submitting, isSubmitting] = useState(false)
  const [status, setStatus] = useState("PERFORM CHECKOUT")
  const handleAdd = () => {
    setisAdding(true);
  };
  const handleCheckout = async () => {
    if(checkoutCardList.length===0){
      setStatus("NO ITEMS DETECTED")
      setTimeout(() => { setStatus("PERFORM CHECKOUT") }, 1000)
      return
    }
    isSubmitting(true)
    setStatus("ADDING TRANSACTION...")
    let total = 0
    const tx_details_list = checkoutCardList.map(item => {
      const { item_affected, in_stock, stock_out, profit, checkout_price } = item;
      total += Number(checkout_price)
      return { item_affected, stock_in: in_stock, stock_out, profit };
    });
    const data = {
      tx_type: 'checkout',
      tx_details: tx_details_list,
      tx_total: total
    }

    try {
      const res = await axios.post(`${API_ENDPOINT}/drug/checkout`, data)
      console.log(res.data)
      setCheckoutCardList([])
      setDrugSelected(null)
      setProfit(0)
      setcheckoutTotal(0)
      isSubmitting(false)
      setStatus("TRANSACTION SUCCESS")
      setTimeout(() => { navigate("/dash") }, 1000)
    } catch (err) {
      isSubmitting(false)
      setStatus("AN ERROR OCCURED")
      console.log(err)
      setTimeout(() => { setStatus("PERFORM CHECKOUT") }, 2000)
    }
  }

  const handleUpdate = (details) => {
    const exists = checkoutCardList.some(item => item._id === details.drugId);

    if (exists) {
      setCheckoutCardList(prevList => prevList.map(item => {
        if (item._id === details.drugId) {
          const { unitsToCheckout, checkout } = details
          item.stock_out = item.in_stock - unitsToCheckout
          item.profit = checkout - Number(item.item_price)
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
        const { _id, item_name, item_price, barcode_no, in_stock } = drugSelected
        drugSelected['stock_out'] = in_stock - 1
        drugSelected['item_affected'] = _id
        drugSelected['profit'] = 0
        drugSelected['checkout_price'] = item_price
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
          total += Number(item.item_price)
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
                    drugPrice={item.item_price}
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
            <div className="px-3 md:w-5/12">
              <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6">
                <div className="w-full flex mb-3 items-center">
                  <CheckoutTotalCard unitTotal={unitTotal} profit={profit} totalCheckout={checkoutTotal} />
                </div>
              </div>
              <div>
                <button onClick={handleCheckout} disabled={submitting} className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-2 font-semibold">
                  <i className="mdi mdi-lock-outline mr-1"></i>{status}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
