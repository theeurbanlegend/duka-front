import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';
import { API_URL } from '../../config/config';

const SupplierDetailsCard = ({ supplier, setSupSelected }) => {
    const [editingMode, setEditingMode] = useState(false)
    const [manufacturerName, setManufacturerName] = useState(supplier?.man_name || "");
    const [manufacturerPhone, setManufacturerPhone] = useState(supplier?.man_phone || "");
    const [manufacturerLocation, setManufacturerLocation] = useState(supplier?.man_location || "");
    const [manufacturerEmail, setManufacturerEmail] = useState(supplier?.man_email || "");
    const [manufacturerWebsite, setManufacturerWebsite] = useState(supplier?.man_website || "");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            const data = {
                man_name: manufacturerName,
                man_phone: manufacturerPhone,
                man_location: manufacturerLocation,
                man_email: manufacturerEmail,
                man_website: manufacturerWebsite
            };
            const response = await axios.post(`${API_URL}/manufacturer/${supplier._id}/update`, data);
            setManufacturerName('');
            setManufacturerPhone('');
            setManufacturerLocation('');
            setManufacturerEmail('');
            setManufacturerWebsite('');
            setSubmitting(false);
            setSupSelected(null)
        } catch (error) {
            console.error('Error:', error);
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center w-full">
            <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg px-8 py-6 max-w-md">
                <FontAwesomeIcon icon={faTimes} size='xl' className='absolute right-6 cursor-pointer' onClick={() => setSupSelected(null)} />
                <h1 className="text-2xl font-bold text-left mb-4 dark:text-gray-200">Supplier Details</h1>
                <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-4'>
                    <div className="mb-4 flex flex-col">
                        <label htmlFor="man_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                        <input readOnly={!editingMode} type="text" id="man_name" value={manufacturerName} onChange={(e) => setManufacturerName(e.target.value)} className={`${editingMode ? "shadow-sm rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" : "bg-transparent"}`} placeholder="Name of supplier" required />
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label htmlFor="man_phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                        <input readOnly={!editingMode} type="text" id="man_phone" value={manufacturerPhone} onChange={(e) => setManufacturerPhone(e.target.value)} className={`${editingMode ? "shadow-sm rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" : "bg-transparent"}`} required />
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label htmlFor="man_location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
                        <input readOnly={!editingMode} type="text" id="man_location" value={manufacturerLocation} onChange={(e) => setManufacturerLocation(e.target.value)} className={`${editingMode ? "shadow-sm rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" : "bg-transparent"}`} required />
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label htmlFor="man_email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                        <input readOnly={!editingMode} type="email" id="man_email" value={manufacturerEmail} onChange={(e) => setManufacturerEmail(e.target.value)} className={`${editingMode ? "shadow-sm rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" : "bg-transparent"}`}  />
                    </div>
                    <div className="mb-4 flex flex-col">
                        <label htmlFor="man_website" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Website</label>
                        <input readOnly={!editingMode} type="text" id="man_website" value={manufacturerWebsite} onChange={(e) => setManufacturerWebsite(e.target.value)} className={`${editingMode ? "shadow-sm rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" : "bg-transparent"}`}  />
                    </div>
                    <div className='flex col-span-2 justify-center bg-gray-800 rounded-md shadow-md hover:bg-gray-600 cursor-pointer'>
            {editingMode ?
              <button type="submit" disabled={submitting} className="col-span-2 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">{submitting?<FontAwesomeIcon spinPulse icon={faSpinner}/>:"Save"}</button>
              : <div className='w-full text-center' onClick={() => setEditingMode(true)}>Edit</div>}
          </div>

                </form>
            </div>
        </div>
    );
};

export default SupplierDetailsCard;
