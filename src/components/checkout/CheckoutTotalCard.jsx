import React from 'react'

const CheckoutTotalCard = ({unitTotal, profit, totalCheckout}) => {
    return (
        <div className='w-full p-3'>
            <div class="mb-6 pb-6 border-b border-gray-200 text-gray-800">
                <div class="w-full flex mb-3 items-center">
                    <div class="flex-grow">
                        <span class="text-gray-600">Unit total</span>
                    </div>
                    <div class="pl-3">
                        <span class="font-semibold">{unitTotal}</span>
                    </div>
                </div>
                <div class="w-full flex items-center">
                    <div class="flex-grow">
                        <span class="text-gray-600">Profit</span>
                    </div>
                    <div class="pl-3">
                        <span class="font-semibold">{profit}</span>
                    </div>
                </div>
            </div>
            <div class="mb-6 pb-6 border-b border-gray-200 md:border-none text-gray-800 text-xl">
                <div class="w-full flex items-center">
                    <div class="flex-grow">
                        <span class="text-gray-600">Total Checkout</span>
                    </div>
                    <div class="pl-3">
                        <span class="font-semibold text-gray-400 text-sm">Ksh</span> <span class="font-semibold">{totalCheckout}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutTotalCard