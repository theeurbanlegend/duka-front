import React, { useContext, useEffect, useState } from 'react'
import InventoryTable from '../tables/InventoryTable'
import AddDrug from '../forms/AddDrug'
import { childContext } from '../../App'
import axios from 'axios'
import { toast} from 'react-hot-toast';
import { API_URL } from '../../config/config'

const Inventory = () => {
  const { invModalHidden, refresh1 , setDrugList} = useContext(childContext)
  const [drugs, setDrugs] = useState(null)
  useEffect(() => {
    async function getDrugs() {try {
      const res = await axios.get(`${API_URL}/drug/all`);
      // Handle successful response
      setDrugs(res.data)
      console.log(res.data)
      setDrugList(res.data)
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
    getDrugs()
  }, [refresh1])
  return (
    <>
      <InventoryTable drugs={drugs} />
      {!invModalHidden &&
        <div className='fixed top-[4%] left-[21%] lg:top-[5%] lg:left-[35%]'>
          <AddDrug />
        </div>}
    </>
  )

}

export default Inventory