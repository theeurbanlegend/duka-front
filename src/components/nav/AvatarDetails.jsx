import React, { useContext } from 'react'
import { childContext } from '../../App'
import useAuth from '../features/useAuth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'

const AvatarDetails = () => {
    const accessToken=localStorage.getItem('accessToken')
    const {session, setSession}=useContext(childContext)
    const {username, phone}=useAuth(session[0])
    const handleLogout=()=>{
        if(accessToken) localStorage.removeItem('accessToken')
        if(session) setSession(null)
        window.location.reload()
    }
    return (
        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
            <p className="block text-center px-4 py-2 text-lg text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">{username}</p>
            <p className="block px-4 py-2 text-center text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">{phone}</p>
            <a onClick={handleLogout} className="flex items-center px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-slate-300" role="menuitem" tabIndex="-1" id="user-menu-item-2">
                <FontAwesomeIcon icon={faSignOut}/>

                <p className='ml-3'>Sign out</p>
            </a>
        </div>
    )
}

export default AvatarDetails