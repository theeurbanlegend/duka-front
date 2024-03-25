import React, { useContext } from 'react'
import { childContext } from '../../App'
import useAuth from '../features/useAuth'

const Avatar = ({handleClick}) => {
    const {session}=useContext(childContext)
    const {username, phone}=useAuth(session[0])
    return (
        <div>
            <button type="button" onClick={handleClick} className="relative flex max-w-xs text-xl items-center rounded-full bg-pink-800  focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                <div className="h-8 w-8 rounded-full 
                flex items-center justify-center" >{username[0].toUpperCase()}</div>
            </button>
        </div>
    )
}

export default Avatar