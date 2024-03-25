import React, { useContext } from 'react';
import { childContext } from '../../App';
import Dashboard from '../dash/Dashboard';
import Inventory from '../dash/Inventory';
import Suppliers from '../dash/Suppliers';
import Reports from '../dash/Reports';

const SideBar = () => {
    const { currentChild, setCurrentChild ,setActive} = useContext(childContext);

    const isActive = (component) => {
        return currentChild.type === component ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white";
    };

    return (
        <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
                <a href="#" onClick={() => {
                    setCurrentChild(<Dashboard />)
                    setActive("Dashboard")
                    }} className={`rounded-md px-3 py-2 text-sm font-medium ${isActive(Dashboard)}`} aria-current="page">Dashboard</a>
                <a href="#" onClick={() => {
                    setCurrentChild(<Inventory />)
                    setActive("Inventory")
                    }} className={`rounded-md px-3 py-2 text-sm font-medium ${isActive(Inventory)}`}>Inventory</a>
                <a href="#" onClick={() => {
                    setCurrentChild(<Suppliers />)
                    setActive("Suppliers")
                }} className={`rounded-md px-3 py-2 text-sm font-medium ${isActive(Suppliers)}`}>Suppliers</a>
                <a href="#" onClick={() => {
                    setCurrentChild(<Reports />)
                    setActive("Reports")
                    }} className={`rounded-md px-3 py-2 text-sm font-medium ${isActive(Reports)}`}>Reports</a>
            </div>
        </div>
    );
}

export default SideBar;
