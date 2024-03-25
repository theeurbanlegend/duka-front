import React from 'react'

const StockLevelCard = () => {
    return (
        <div className="mt-4 w-full lg:w-6/12 xl:w-3/12 px-5 mb-4">
        <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-3 xl:mb-0 shadow-lg">
            <h1 className="pl-10  sm:pt-5 text-black sm:pl-80  pt-5 ">Html <span className=" text-xs text-yellow-400">80%</span></h1>
            <div className="mt-2 ml-10 sm:ml-80 h-4 relative w-60 rounded-full overflow-hidden">
                <div className=" w-full h-full bg-gray-200 absolute "></div>
                <div className=" h-full bg-yellow-400 sm:bg-green-500 absolute" style={{ width: "80%" }}></div>
                <div>All Good</div>
            </div>

        </div>
        </div>
    )
}

export default StockLevelCard