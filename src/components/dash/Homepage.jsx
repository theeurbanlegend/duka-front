import React, { useContext } from 'react'
import Navbar from '../nav/Navbar'
import Inventory from './Inventory'
import Header from '../nav/Header'
import { childContext } from '../../App'

const Homepage = () => {
    const {currentChild, setCurrentChild}=useContext(childContext)
    
    return (
        <div className="min-h-full">
            <Navbar />
            <Header />
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    {currentChild}
                </div>
            </main>
        </div>

    )
}

export default Homepage