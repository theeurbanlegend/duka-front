import React, { useContext } from 'react'
import { childContext } from '../../App'
import useAuth from '../features/useAuth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'

const SideBarDetailsMobile = () => {
    const {session, setSession}=useContext(childContext)
    const {username, phone}=useAuth(session[0])
    const accessToken=localStorage.getItem('accessToken')
    const handleLogout=()=>{
        if(accessToken) localStorage.removeItem('accessToken')
        if(session) setSession(null)
        window.location.reload()
    }
    return (
        <div className="border-t border-gray-700 pb-3 pt-4">
            <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                    <div className="h-10 w-10 text-xl rounded-full flex items-center justify-center bg-teal-600" >{username[0].toUpperCase()}</div>
                </div>
                <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">{username}</div>
                    <div className="text-sm font-medium leading-none text-gray-400">{phone}</div>
                </div>

            </div>
            <div className="mt-3 space-y-1 px-2">
                {/* <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Your Profile</a>
                <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Settings</a> */}
                <a href="#" onClick={handleLogout} className="flex items-center rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                <FontAwesomeIcon icon={faSignOut}/>

<p className='ml-3'>Sign out</p>
                </a>
            </div>
        </div>
    )
}

export default SideBarDetailsMobile