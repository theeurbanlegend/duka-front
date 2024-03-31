import React, { useCallback, useContext, useEffect, useState } from 'react'
import SuppliersTable from '../tables/SuppliersTable'
import { childContext } from '../../App'
import AddSupplier from '../forms/AddSupplier'
import axios from 'axios'
import { API_URL } from '../../config/config'
import SupplierDetailsCard from '../details/SuppliersDetailsCard'

const Suppliers = () => {
  const {supToView, setSupToView, supModalHidden, refresh2, setRefresh2}=useContext(childContext)
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
      <SuppliersTable suppliers={suppliers} setsupSelected={setSupToView}/>
      {!supModalHidden &&
      <div className='fixed top-[4%] left-[21%] lg:top-[5%] lg:left-[35%]'>
        <AddSupplier/>
      </div>}
      {supToView&&
        <div className='fixed top-[4%] left-[21%] lg:top-[5%] lg:left-[35%]'>
          <SupplierDetailsCard supplier={supToView} setSupSelected={setSupToView} setrefresh={setRefresh2}/>

        </div>
      }
    </div>
  )
}

export default Suppliers