import React, { useEffect, useState } from 'react'
import TransactionTable from '../tables/TransactionTable'
import axios from 'axios'
import toast from 'react-hot-toast'
import { API_URL } from '../../config/config'

const Reports = () => {
  const [txns, setTxns] = useState(null)
  useEffect(() => {
    async function getTxns() {
      try {
      const res = await axios.get(`${API_URL}/drug/txns/all`);
      console.log(res)
      setTxns(res.data)
      toast.success("Success!", {
        position: "top-center"
      });
  } catch (error) {
      // Handle network errors or server response errors
      if (error.response) {
          // The request was made and the server responded with a status code that falls out of the range of 2xx
          console.error("Server responded with error status:", error.response.status);
          console.error("Error data:", error.response.data);
          toast.error(error.response.data.message, {
            position:'top-center'
          })
      } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received:", error.request);
          toast.error("Youre offline!", {
            position:'top-center'
          })
      } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error setting up request:", error.message);
      }
  }
      
    }
    getTxns()
  }, [])
  return (
    <div>
      
      <TransactionTable txns={txns}/>
      
      
    </div>

  )
}

export default Reports