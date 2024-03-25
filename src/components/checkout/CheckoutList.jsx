import React, { useContext, useState } from 'react'
import { childContext } from '../../App'

const CheckoutList = ({setisAdding, setDrugSelected}) => {
  const { drugList } = useContext(childContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [unfilteredList, setUnfilteredList] = useState(drugList);


  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    const filteredList = drugList.filter((drug) =>
      drug.item_name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setUnfilteredList(filteredList);
  };
  const handleSelect=(details)=>{
    setDrugSelected(details)
    setisAdding(false)
  }

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-md  bg-gradient-to-r from-violet-100 to-indigo-100 flex items-center justify-center ">
      <div className="sm:w-11/12 md:w-8/12 lg:w-full backdrop-blur-sm bg-white/40 p-6 rounded-lg shadow-sm border-violet-200 border">

        <div className="w-full flex justify-center p-1 mb-4">
          <div className="relative w-full">
            <input type="text" className="w-full backdrop-blur-sm bg-white/20 py-2 pl-10 pr-4 rounded-lg focus:outline-none border-2 border-gray-100 focus:border-violet-300 transition-colors duration-300"
              value={searchTerm} onChange={handleInputChange} placeholder="Search..." />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="overflow-y-auto max-h-80">
          <div className="grid grid-rows-1 sm:grid-rows-2 md:grid-rows-2 lg:grid-rows-2 gap-4 ">

            {unfilteredList && unfilteredList.map(drug => (
              <div key={drug._id} onClick={()=>handleSelect(drug)}className="backdrop-blur-sm bg-white/20 p-6 rounded-md shadow-sm cursor-pointer border-2 border-gray-50 hover:border-violet-200 hover:border-2 transition-colors duration-300">
                <h2 className="text-xl font-semibold mb-4">{drug.item_name}</h2>
                <div className="col-start-2 row-start-1 row-end-3 sm:mt-4 lg:mt-4 xl:mt-4">
                  <div >
                    <span className="font-semibold text-gray-600 ">In Stock: {drug.in_stock}</span>
                  </div>

                  <div >
                    <span className="font-semibold text-gray-600 ">Ksh {drug.item_price}</span><span className="font-semibold text-gray-600 text-sm">.00</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default CheckoutList