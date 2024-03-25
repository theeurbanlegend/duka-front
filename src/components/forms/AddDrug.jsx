import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { childContext } from '../../App';
import axios from 'axios';
import io from 'socket.io-client'
import { toast } from 'react-hot-toast';

const AddDrug = () => {
    //const API_ENDPOINT="http://localhost:3000/"
    const API_ENDPOINT = "https://9959mgp3-3000.euw.devtunnels.ms/"
    const { setinvModalHidden , setRefresh1} = useContext(childContext)
    const [barcode, setBarcode] = useState('')
    const socket = io(API_ENDPOINT)
    const [barcodeMode, setBarcodeMode] = useState(false)
    const [barcodeDetails, setbarcodeDetails] = useState([])
    const [receivedBarcode, hasReceivedBarcode] = useState(false)
    const [submitting, isSubmitting] = useState(false)
    const [drugName, setDrugName] = useState("");
    const [drugPrice, setDrugPrice] = useState("");
    const [nameStatus, setnameStatus]=useState("Add")
    const [manufacturerId, setManufacturerId] = useState("");
    const [inStock, setInStock] = useState(0);
    const connectToBarcodeAPI = () => {
        if(barcodeMode){
            setBarcodeMode(false)
            setnameStatus("Add")
        }else{
            setBarcodeMode(true)
            setnameStatus("Awaiting Barcode details....")
        }
        
    }
    const handleSubmit = async (e) => {
        if(!drugName && barcodeMode) toast.error('Please select the name received from the dropdown!', {position:'top-center'})
        e.preventDefault();
        try {
            isSubmitting(true);
            setnameStatus('Adding....')
            const data = {
                item_name: drugName,
                item_price: drugPrice,
                in_stock: Number(inStock),
                barcode_no: barcode
            }
            if (!manufacturerId === "None") data[manufacturerId] = manufacturerId
            if (!barcodeMode) delete data.barcode_no
            const response = await axios.post(`${API_ENDPOINT}drug/add`, data);
            isSubmitting(false)
            setBarcode("")
            setBarcodeMode(false)
            setDrugName('')
            setDrugPrice("")
            setInStock(0)
            setbarcodeDetails([])
            setnameStatus('Added successfully!')
            setTimeout(()=>{
                setnameStatus('Add')
            }, 1000)
            setRefresh1(prev=>!prev)
        } catch (error) {
            console.error('Error:', error);
            isSubmitting(false)
            setnameStatus('Adding failed!')
        } 
    }
    const nonBarcodeInput = (
        <div className="mb-4 flex flex-col">
            <label htmlFor="drug_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Drug Name</label>
            <input type="text" id="drug_name" value={drugName} onChange={(e) => setDrugName(e.target.value)} className="shadow-sm rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="eg. Calpol" required />
        </div>)
    const barcodeInput = (
        <div className="mb-4 flex flex-col">
          <label htmlFor="drug_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Drug Name</label>
          <select
            id="drug_name"
            value={drugName}
            onChange={(e) => {setDrugName(e.target.value); }}
            className="shadow-sm rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            {barcodeDetails && barcodeDetails.map((bar, index) => (
              <option key={index} value={bar} onClick={()=>setDrugName(bar)}>
                {bar}
              </option>
            ))}
          </select>
        </div>
      );
      
      const handleBarcodeDetails = useCallback((details) => {
        console.log(details);
        setBarcode(details.message);
        if (details.variants===null) toast.error("Oops didn't receive drug name, you might want to set it manually", {position:'top-center'})
        setbarcodeDetails(details.variants);
        setnameStatus("Received barcode details...")
        setTimeout(()=>{
            setnameStatus('Add')
        }, 1000)
      }, []);
    
      useEffect(() => {
        socket.emit('joinRoom', 'receiver'); // Join the room as a receiver
        socket.on('obtainedBarcodeDetails', handleBarcodeDetails);
    
        return () => {
          socket.off('obtainedBarcodeDetails', handleBarcodeDetails);
        };
      }, []);


    return (
        <div className="min-h-screen flex items-center justify-center w-full">
            <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
                <FontAwesomeIcon icon={faTimes} size='xl' className='absolute right-6 cursor-pointer' onClick={() => setinvModalHidden(true)} />
                <h1 className="text-2xl font-bold text-left mb-4 dark:text-gray-200">Add Drug</h1>
                <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-4'>
                    {barcodeMode?barcodeInput:nonBarcodeInput}
                    <div className="mb-4 flex flex-col">
                        <label htmlFor="drugprice" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Drug price</label>
                        <input type="text" id="drugprice" value={drugPrice} onChange={(e) => setDrugPrice(e.target.value)} className="shadow-sm rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label htmlFor="manufacturer_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Supplier</label>
                        <select id="manufacturer_id" value={manufacturerId} onChange={(e) => setManufacturerId(e.target.value)} className="shadow-sm rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required>
                            <option value="None" >None</option>
                            <option value="manufacturer1">Manufacturer 1</option>
                            <option value="manufacturer2">Manufacturer 2</option>
                        </select>

                    </div>
                    <div className="mb-4 flex flex-col">
                        <label htmlFor="instock" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">In Stock</label>
                        <input type="number" id="instock" value={inStock} onChange={(e) => setInStock(e.target.value)} className="shadow-sm rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                    </div>
                    {barcodeMode && <div className='flex flex-col'><div className="mb-4 flex flex-col">
                        <label htmlFor="barcode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Barcode</label>
                        <input type="text" id="barcode" readOnly value={barcode} onChange={(e) => setBarcode(e.target.value)} className="shadow-sm rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                        <a href="#"
                            className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Scan from here</a>
                    </div>
                    }
                    <div className="flex items-center justify-between mb-4 col-span-2">
                        <div className="flex items-center">
                            <input type="checkbox" id="remember" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none" checked={barcodeMode} onClick={connectToBarcodeAPI} />
                            <label htmlFor="remember" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">Use Barcode</label>
                        </div>

                    </div>
                    <button type="submit" disabled={submitting} className="col-span-2 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">{nameStatus}</button>
                </form>
            </div>
        </div>
    );
};

export default AddDrug;
