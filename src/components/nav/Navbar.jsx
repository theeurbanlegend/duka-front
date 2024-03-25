import React, { useState } from 'react'
import pillLogo from '../../assets/pill.svg'
import SideBarMobile from './SideBarMobile'
import SideBarDetailsMobile from './SideBarDetailsMobile'
import SideBar from './SideBar'
import Avatar from './Avatar'
import AvatarDetails from './AvatarDetails'
import Hamburger from './Hamburger'
const Navbar = () => {
    const [isHovered, setIsHovered]=useState(false)
    return (
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 text-gray-700">
                            <img className="h-8 w-8" src={pillLogo} alt="Pharma Manager" />
                            Pharma Manager
                        </div>
                        <SideBar />

                    </div>

                    <div className="hidden md:block" >
                        <div className="ml-4 flex items-center md:ml-6">
                            <div className="relative ml-3"  >
                                <Avatar handleClick={()=>setIsHovered(prev=>!prev)}/>
                                {isHovered &&<AvatarDetails />}
                            </div>
                        </div>
                    </div>
                    <Hamburger />
                </div>
            </div>

            <div className="md:hidden" id="mobile-menu">
                <SideBarMobile />
                <SideBarDetailsMobile />
            </div>
        </nav>
    )
}

export default Navbar