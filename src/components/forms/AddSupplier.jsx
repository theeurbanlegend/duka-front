import React, { useContext, useState } from 'react';
import { childContext } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { API_URL } from '../../config/config';

const AddSupplier = () => {
    const {setsupModalHidden}=useContext(childContext)
    const [manufacturerName, setManufacturerName] = useState("")
    const [manufacturerPhone, setManufacturerPhone] = useState("")
    const [submitting, isSubmitting]=useState(false)
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            isSubmitting(true);
            const data = {
                man_name:manufacturerName,
                man_phone:manufacturerPhone
            }
            const response = await axios.post(`${API_URL}/manufacturer/add`, data);
            setManufacturerName('')
            setManufacturerPhone("")
            isSubmitting(false)
        } catch (error) {
            console.error('Error:', error);
            isSubmitting(false)
        } finally {
            isSubmitting(false);
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center w-full">
            <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
            <FontAwesomeIcon icon={faTimes} size='xl' className='absolute right-6 cursor-pointer' onClick={()=>setsupModalHidden(true)} />

                <h1 className="text-2xl font-bold text-left mb-4 dark:text-gray-200">Add Supplier</h1>
                <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-4'>
                    <div className="mb-4 flex flex-col">
                        <label htmlFor="man_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                        <input type="text"  id="man_name" value={manufacturerName} onChange={(e)=>setManufacturerName(e.target.value)} className="shadow-sm rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="name of supplier" required />
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label htmlFor="man_phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                        <input type="text" id="man_phone" value={manufacturerPhone} onChange={(e)=>setManufacturerPhone(e.target.value)} className="shadow-sm rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                    </div>
                    
                    <button type="submit" className="col-span-2 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">{submitting?<FontAwesomeIcon spinPulse icon={faSpinner}/>:"Add"}</button>
                </form>
            </div>
        </div>
    );
};

export default AddSupplier;
