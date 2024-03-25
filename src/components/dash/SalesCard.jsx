import { faAnchorCircleXmark, faMoneyBill, faMoneyBill1, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
const SalesCard = ({totalSales, salesChange}) => {
    return (
        <div className="mt-4 w-full lg:w-6/12 xl:w-3/12 px-5 mb-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-3 xl:mb-0 shadow-lg">
                <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 className="text-blueGray-400 uppercase font-bold text-xs">Sales</h5>
                            <span className="font-semibold text-xl text-blueGray-700">{totalSales}</span>
                        </div>
                        <div className="relative w-auto pl-4 flex-initial">
                            <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-red-500">
                                <FontAwesomeIcon icon={faMoneyBillWave} />
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-blueGray-400 mt-4">
                        <span className="text-emerald-500 mr-2"><i className="fas fa-arrow-up"></i> {salesChange}% </span>
                        <span className="whitespace-nowrap"> since last txn </span></p>
                </div>
            </div>
        </div>
    )
}

export default SalesCard