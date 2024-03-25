import React, { useEffect, useState } from 'react'
import SalesCard from './SalesCard'
import StockCard from './StockCard'
import ProfitCard from './ProfitCard'
import StockLevelCard from './StockLevelCard'
import axios from 'axios'
import { API_URL } from '../../config/config'
const Dashboard = () => {
  const [totalSales, setTotalSales] = useState(0)
  const [salesChange, setSalesChange] = useState(0)
  const [totalStock, setTotalStock] = useState(0)
  const [stockChange, setStockChange] = useState(0)
  const [totalProfit, setTotalProfit] = useState(0)
  const [profitChange, setProfitChange] = useState(0)
  useEffect(() => {
    const calculateData = async () => {
      try {
        let salesTotal = 0
        let profitTotal = 0

        const itemsRes = await axios.get(`${API_URL}/drug/all`)
        const items = itemsRes.data

        // Calculate total stock
        const stockSum = items.reduce((acc, item) => acc + item.in_stock, 0)
        setTotalStock(stockSum)

        const res = await axios.get(`${API_URL}/drug/txns/all`)
        const allTxns = res.data
        if (allTxns.length > 0) {

          allTxns.map(txn => {
            salesTotal += Number(txn.tx_total)
            txn.tx_details.forEach(detail => {
              profitTotal += Number(detail.profit)
            })
          })
          
          allTxns.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          if (allTxns.length >= 2) {
            const latestSales = Number(allTxns[0].tx_total)
            const secondLatestSales = Number(allTxns[1].tx_total)
            setSalesChange(latestSales - secondLatestSales)
            const latestProfit = profitTotal
            const secondLatestProfit = allTxns[1].tx_details.reduce((acc, detail) => acc + Number(detail.profit), 0)
            const profitChange = ((latestProfit - secondLatestProfit))
            setProfitChange(profitChange)
            const latestTxn = allTxns[0]
            if (latestTxn) {
              const latestStock = latestTxn.tx_details.reduce((acc, detail) => acc + detail.stock_in, 0)
              const stockChange = ((latestStock - totalStock))
              setStockChange(stockChange)
            }
          }

          setTotalSales(salesTotal)
          setTotalProfit(profitTotal)
        }


      }
      catch (err) {
        console.log(err)
      }

    }
    calculateData()
  }, [])
  return (
    <div className="flex flex-wrap bg-pink-500 h-[80vh]">
      <SalesCard totalSales={totalSales} salesChange={salesChange} />
      <StockCard totalStock={totalStock} stockChange={stockChange} />
      <ProfitCard totalProfit={totalProfit} profitChange={profitChange} />
    </div>
  )
}

export default Dashboard