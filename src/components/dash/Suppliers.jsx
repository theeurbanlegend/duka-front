import React, { useCallback, useContext, useEffect, useState } from 'react'
import SuppliersTable from '../tables/SuppliersTable'
import { childContext } from '../../App'
import AddSupplier from '../forms/AddSupplier'
import axios from 'axios'
import { API_URL } from '../../config/config'

const Suppliers = () => {
  const {supModalHidden, refresh2}=useContext(childContext)
  const [suppliers, setSuppliers]=useState(null)
  useEffect(()=>{
    async function getSuppliers(){
      const res=await axios.get(`${API_URL}/manufacturer/all`)
      setSuppliers(res.data)
    }
    getSuppliers()
  },[refresh2])
  return (
    <div>
      <SuppliersTable suppliers={suppliers}/>
      {!supModalHidden &&
      <div className='fixed top-[4%] left-[21%] lg:top-[5%] lg:left-[35%]'>
        <AddSupplier/>
      </div>}
    </div>
  )
}

export default Suppliers