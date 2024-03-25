import React from 'react'

const BarLoader = () => {
    return (
        <div class="bg-white  p-4 animate-pulse w-full">
            <div class="w-full h-12 bg-gray-300 rounded mb-4"></div>
            <div class="w-full h-12 bg-gray-300 rounded mb-4"></div>
            <div class="w-full h-12 bg-gray-300 rounded mb-4"></div>
            <div class="w-full h-12 bg-gray-300 rounded"></div>
        </div>
    )
}

export default BarLoader