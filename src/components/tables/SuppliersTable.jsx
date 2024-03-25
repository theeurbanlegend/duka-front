import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import BarLoader from './BarLoader'

const SuppliersTable = ({suppliers}) => {
  return (
    <div className="flex flex-wrap -mx-3 mb-5">
    <div className="w-full max-w-full px-3 mb-6  mx-auto">
      <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
        <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">    
          <div className="flex-auto block py-8 pt-6 px-9">
            <div className="overflow-x-auto">
              <table className="w-full my-0 align-middle text-dark border-neutral-200">
                <thead className="align-bottom">
                  <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                    <th className="pb-3 text-start min-w-[175px]">NAME</th>
                    <th className="pb-3 text-end min-w-[100px]">PHONE</th>
                    <th className="pb-3 text-end min-w-[50px]">DETAILS</th>
                  </tr>
                </thead>
                <tbody>
                  {suppliers && suppliers.length>0?suppliers.map((sup)=>(
                    <tr key={sup._id} className="border-b border-dashed last:border-b-0">
                    <td className="p-3 pl-0">
                      <div className="flex items-center">
                        <div className="relative inline-block shrink-0 rounded-2xl me-3">
                          <FontAwesomeIcon icon={faUser} className="w-[50px] h-[50px] inline-block shrink-0 rounded-2xl" alt="" />
                        </div>
                        <div className="flex flex-col justify-start">
                          <a href="#" className="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary">{sup.man_name}</a>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 pr-0 text-end">
                      <span className="font-semibold text-light-inverse text-md/normal">{sup.man_phone}</span>
                    </td>
                    
                    <td className="p-3 pr-0 text-end">
                      <button className="ml-auto relative text-secondary-dark bg-light-dark hover:text-primary flex items-center h-[25px] w-[25px] text-base font-medium leading-normal text-center align-middle cursor-pointer rounded-2xl transition-colors duration-200 ease-in-out shadow-none border-0 justify-center">
                        <span className="flex items-center justify-center p-0 m-0 leading-none shrink-0 ">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                          </svg>
                        </span>
                      </button>
                    </td>
                  </tr>
                  
                  )):(
                    <tr>
                      <td colSpan={3}>
                        {suppliers && suppliers.length === 0 ? (
                          <div className='text-center'>Add some suppliers to find them here</div>
                        ) : (
                          <BarLoader />
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default SuppliersTable