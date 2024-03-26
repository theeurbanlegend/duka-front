import { faCapsules, faEdit, faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

const CheckoutCardItem = ({drugId, drugName, drugPrice, inStock, updateItem}) => {
    const [unitsToCheckout, setUnitsToCheckout]=useState(1)
    const [unitPrice, setUnitPrice]=useState(drugPrice)
    const [checkout, setCheckout]=useState(drugPrice)
    const [editing, isEditing]=useState(false)
    const handleSaveOrEdit=()=>{
        if(editing){
            isEditing(false)
            updateItem({drugId,unitsToCheckout:Number(unitsToCheckout),unitPrice,  checkout:Number(checkout)})
        }
        else{
            isEditing(true)
        }
    }
    const handleUnitsChange=(value)=>{
        setUnitsToCheckout(value)
        const total=Number(value)*Number(unitPrice)
        setCheckout(total)
    }
    const handleUnitPriceChange=(value)=>{
        setUnitPrice(value)
        const total=Number(value)*Number(unitsToCheckout)
        setCheckout(total)
    }
    return (
        <div className="w-full mx-auto text-gray-800 font-light mb-6 border-b border-gray-200 pb-6">
            <div className="w-full flex items-center">
                <div onClick={handleSaveOrEdit} className="flex items-center justify-center rounded-lg w-16 h-16 bg-gray-50 border border-gray-200 cursor-pointer">
                    {editing?<FontAwesomeIcon icon={faSave} size='2xl' />:<FontAwesomeIcon icon={faEdit}/>}
                </div>
                <div className="flex-grow pl-3">
                    <h6 className="font-semibold uppercase text-gray-600">{drugName}</h6>
                    {!editing?<p className="text-gray-400">x {unitsToCheckout}</p>:<input
                    value={unitsToCheckout}
                    onChange={(e)=>handleUnitsChange(e.target.value)}
                    />}
                </div>
                <div className='mr-10'>
                {editing?
                    <input type='text' accept='number' value={unitPrice} 
                    onInput={(e)=>handleUnitPriceChange(e.target.value)}
                    className="font-semibold text-right text-gray-600 text-xl w-10"/>:<span className="font-semibold text-gray-600 text-xl">{unitPrice}</span>}<span className="font-semibold text-gray-600 text-sm">.00</span>
                </div>
                <div className='mr-10'>              
                    <span className="font-semibold text-gray-600 text-xl">{checkout}</span>
                    <span className="font-semibold text-gray-600 text-sm">.00</span>
                </div>
            </div>
        </div>
    )
}

export default CheckoutCardItem