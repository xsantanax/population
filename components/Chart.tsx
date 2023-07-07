'use client'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Label } from 'recharts'
import populationData from '@/lib/populacao_bairros.json'
import { getColor } from '@/lib/functions'
import { useChart } from '@/hooks/useChart'
import styles from '@/styles/chart.module.sass'
import { useMap } from '@/hooks/useMap'

function MyChart() {
  const { chartId } = useChart()
  const { names } = useMap()
  const regionData = populationData.filter(
    (item) => item.id_geometria == chartId
  )

  return (
    <>
      <div className={styles.regionName}>{names[chartId - 1]}</div>
      <div className={styles.container}>
        {regionData.length > 0 && (
          <>
            <div className={styles.label}>Population</div>
            <LineChart width={380} height={320} data={regionData}>
              <Line
                type='monotone'
                dataKey='populacao'
                stroke={getColor(chartId)}
              />
              <CartesianGrid stroke='#ccc' />
              <XAxis dataKey='ano'>
                <Label value='Year' offset={-5} position='insideBottom' />
              </XAxis>
              <YAxis domain={[5000, 25000]} />
            </LineChart>
          </>
        )}
      </div>
    </>
  )
}

export default MyChart
