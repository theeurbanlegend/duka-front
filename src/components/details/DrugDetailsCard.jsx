import { faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { childContext } from '../../App';
import axios from 'axios';
import { API_URL } from '../../config/config';

const DrugDetailsCard = ({ drugSelected, setDrugSelected, setRefresh1 }) => {
  const [barcode, setBarcode] = useState(drugSelected?.barcode_no || "")
  const [editingMode, seteditingMode] = useState(false)
  const [submitting, isSubmitting] = useState(false)
  const [drugName, setDrugName] = useState(drugSelected.item_name);
  const [drugPrice, setDrugPrice] = useState(drugSelected.selling_price);
  const [drugRetail, setDrugRetail] = useState(drugSelected.retail_price);
  const [nameStatus, setnameStatus] = useState("Save")
  const [manufacturerId, setManufacturerId] = useState(null);
  const [expiry, setExpiry] = useState(drugSelected?.expiry_date)
  const [manuDetails, setManuDetails] = useState(drugSelected.manufacturer_id)
  const [manu_list, setmanu_list] = useState(null)
  const [inStock, setInStock] = useState(drugSelected?.in_stock);

  const editingModeinput = (
    <select id="manufacturer_id" value={manufacturerId} onChange={(e) => setManufacturerId(e.target.value)} className={`${editingMode ? "shadow-sm rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" : "bg-transparent"}`} required>
      {manu_list && manu_list.map((manu, index) => (
        <option key={index} value={manu._id} onClick={() => setManufacturerId(manu._id)}>
          {manu.man_name}
        </option>
      ))}
    </select>
  )
  useEffect(() => {
    const getManu = async () => {
      try {
        const res = await axios.get(`${API_URL}/manufacturer/all`)
        const manus = res.data
        setmanu_list(manus)
      }
      catch (err) {
        console.log(err)
      }
    }
    getManu()
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      isSubmitting(true);
      setnameStatus(<FontAwesomeIcon spinPulse icon={faSpinner} />)
      const data = {
        item_name: drugName,
        retail_price: Number(drugRetail),
        selling_price: Number(drugPrice),
        in_stock: Number(inStock),
        expiry_date: new Date(expiry).toISOString()
      }
      if(manufacturerId) data['manufacturer_id']=manufacturerId
      console.log(data.expiry_date)
      const response = await axios.post(`${API_URL}/drug/${drugSelected._id}/update`, data);
      isSubmitting(false)

      setnameStatus('Saved successfully!')
      setTimeout(() => {
        setnameStatus('Save')
        setDrugSelected(null)
        setRefresh1(true)
      }, 1000)
    } catch (error) {
      console.error('Error:', error);
      isSubmitting(false)
      setnameStatus('Savefailed!')
    }
  }
  const nonBarcodeInput = (
    <div className="mb-4 flex flex-col">
      <label htmlFor="drug_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Drug Name</label>
      <input readOnly={!editingMode} type="text" id="drug_name" value={drugName} onChange={(e) => setDrugName(e.target.value)} className={`${editingMode ? "shadow-sm rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" : "bg-transparent"}`} placeholder="eg. Calpol" required />
    </div>)



  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white dark:bg-gray-500 shadow-md rounded-lg px-8 py-6 max-w-md">
        <FontAwesomeIcon icon={faTimes} size='xl' className='absolute right-6 cursor-pointer' onClick={() => setDrugSelected(null)} />
        <h1 className="text-2xl font-bold text-left mb-4 dark:text-gray-200">Drug Details</h1>
        <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-4'>
          {nonBarcodeInput}
          <div className="mb-4 flex flex-col">
            <label htmlFor="manufacturer_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Supplier</label>
            {editingMode ? editingModeinput : manuDetails && manuDetails.man_name
            }

          </div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="drugprice" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Selling Price</label>
            <input type="text" id="drugprice" value={drugPrice} onChange={(e) => setDrugPrice(e.target.value)} className={`${editingMode ? "shadow-sm rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" : "bg-transparent"}`} required />
          </div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="instock" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Retail Price</label>
            <input readOnly={!editingMode} type={editingMode ? 'number' : 'text'} id="instock" value={drugRetail} onChange={(e) => setDrugRetail(e.target.value)} className={`${editingMode ? "shadow-sm rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" : "bg-transparent"}`} required />
          </div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="dateadded" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date Added</label>
            <input type="text" id="dateadded" value={new Date(drugSelected?.createdAt).toDateString()} readOnly className="bg-transparent" required />
          </div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="drugprice" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Expiry Date</label>
            <input type="date" readOnly={!editingMode} id="drugprice" value={new Date(expiry).toISOString().split('T')[0]}

              min={new Date().toISOString().split('T')[0]} // Restrict past dates
              onChange={(e) => setExpiry(e.target.value)} className={`${editingMode ? "shadow-sm rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" : "bg-transparent"}`} required />
          </div>


          <div className="mb-4 flex flex-col">
            <label htmlFor="instock" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">In Stock</label>
            <input readOnly={!editingMode} type={editingMode ? 'number' : 'text'} id="instock" value={inStock} onChange={(e) => setInStock(e.target.value)} className={`${editingMode ? "shadow-sm rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" : "bg-transparent"}`} required />
          </div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="instock" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Barcode</label>
            <input readOnly type={editingMode ? 'number' : 'text'} id="instock" value={drugSelected?.barcode} className={`${editingMode ? "shadow-sm rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" : "bg-transparent"}`} required />
          </div>

          <div className='flex col-span-2 justify-center bg-gray-700 rounded-md shadow-md hover:bg-gray-600 cursor-pointer'>
            {editingMode ?
              <button type="submit" disabled={submitting} className="col-span-2 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">{nameStatus}</button>
              : <div className='w-full text-center' onClick={() => seteditingMode(true)}>Edit</div>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default DrugDetailsCard;
