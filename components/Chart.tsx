'use client'
import { useChart } from '@/hooks/useChart'

function Chart() {
  const { chartId } = useChart()
  return <div>{chartId}</div>
}

export default Chart
