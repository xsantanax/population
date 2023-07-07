'use client'
import { useContext, createContext, useState } from 'react'

const ChartContext = createContext()

const ChartProvider = ({ children }) => {
  const [chartId, setChartId] = useState(null)
  const [chartData, setChartData] = useState([])
  const [name, setName] = useState(null)

  return (
    <ChartContext.Provider
      value={{
        chartId,
        setChartId,
        chartData,
        setChartData,
        name,
        setName
      }}
    >
      {children}
    </ChartContext.Provider>
  )
}

const useChart = () => useContext(ChartContext)

export { ChartProvider, useChart }
