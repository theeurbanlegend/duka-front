import React, { useContext, useState, useEffect } from 'react';
import { childContext } from '../../App';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { active ,setinvModalHidden, setsupModalHidden, setRefresh1, setRefresh2} = useContext(childContext);
    const navigate=useNavigate()
    const [currentDate, setCurrentDate] = useState(new Date().toLocaleTimeString());
    let header = "Dashboard"
    switch (active) {
        case "Inventory":
            header=(<>
            <Button text={"Add To Inventory"} color={"blue"} handleClick={()=>setinvModalHidden(false)}/>
            <Button text={"Refresh Table"} color={"blue"} handleClick={()=>setRefresh1(prev=>!prev)}/>
            <Button text={"Initiate Checkout"} color={"blue"} handleClick={()=>navigate('/dash/checkout')}/>
            </>)
            break;
        case "Suppliers":
            header=(<>
            <Button text={"Add Supplier"} color={"brown"}
            handleClick={()=>setsupModalHidden(false)}/>
            <Button text={"Refresh Table"} color={"blue"} handleClick={()=>setRefresh2(prev=>!prev)}/>
            </>)
            break;
        case "Reports":
            header="Reports"
            break;

        default:
            break;
    }
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(interval);
    }, []); // Empty dependency array to run effect only once

    return (
        <header className="bg-white shadow ">
            <div className="flex justify-between mx-auto px-4 py-6 sm:px-6 lg:px-8">
                <p className="text-left text-3xl font-bold tracking-tight text-gray-900">{header}</p>
                <p className='text-xl tracking-tight text-gray-500 text-right'>{currentDate}</p>
            </div>
        </header>
    );
};

export default Header;
