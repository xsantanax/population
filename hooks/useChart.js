'use client'
import { useContext, createContext, useState } from 'react'

const ChartContext = createContext()

const ChartProvider = ({ children }) => {
  const [chartId, setChart] = useState(null)

  return (
    <ChartContext.Provider
      value={{
        chartId,
        setChart
      }}
    >
      {children}
    </ChartContext.Provider>
  )
}

const useChart = () => useContext(ChartContext)

export { ChartProvider, useChart }
