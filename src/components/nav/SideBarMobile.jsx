import React, { useContext } from 'react'
import { childContext } from '../../App'
import Inventory from '../dash/Inventory'
import Suppliers from '../dash/Suppliers'
import Reports from '../dash/Reports'
import Dashboard from '../dash/Dashboard'

const SideBarMobile = () => {
    const { currentChild, setCurrentChild, setActive } = useContext(childContext)

    const isActive = (component) => {
        return currentChild.type === component ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white";
    };
    return (
        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            <a href="#" onClick={() => {
                setCurrentChild(<Dashboard />)
                setActive("Dashboard")
            }} className={` text-white block rounded-md px-3 py-2 text-base font-medium ${isActive(Dashboard)}`} aria-current="page">Dashboard</a>
            <a href="#" onClick={() => {
                setCurrentChild(<Inventory />)
                setActive("Inventory")
            }} className={`hover:text-white block rounded-md px-3 py-2 text-base font-medium ${isActive(Inventory)}`}>Inventory</a>
            <a href="#" onClick={() => {
                setCurrentChild(<Suppliers />)
                setActive("Suppliers")
            }} className={`hover:text-white block rounded-md px-3 py-2 text-base font-medium ${isActive(Suppliers)}`}>Suppliers</a>
            <a href="#" onClick={() => {
                setCurrentChild(<Reports />)
                setActive("Reports")
            }} className={`hover:text-white block rounded-md px-3 py-2 text-base font-medium ${isActive(Reports)}`}>Reports</a>
        </div>)
}

export default SideBarMobile