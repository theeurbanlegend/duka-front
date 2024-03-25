import React from 'react'

const CheckoutHeader = () => {
  return (
    <div class="w-full mx-auto text-gray-800 font-light mb-6 border-b-2 border-gray-400 pb-6">
            <div class="w-full flex items-center">
                
                <div class="flex-grow pl-3">
                    <h6 class="font-semibold uppercase text-gray-600">DRUG NAME</h6>
                </div>
                <div className='mr-10'>
                    <span class="font-semibold text-gray-600 text-sm">UNIT</span>
                </div>
                
                <div className='mr-10'>
                    <span class="font-semibold text-gray-600 text-sm">CHECKOUT</span>
                </div>
            </div>
        </div>
  )
}

export default CheckoutHeader