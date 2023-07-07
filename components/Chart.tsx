'use client'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Label } from 'recharts'
import populationData from '@/lib/populacao_bairros.json'
import { getColor } from '@/lib/functions'
import styles from '@/styles/chart.module.sass'
import { useMap } from '@/hooks/useMap'

function MyChart() {
  const { names, chartId } = useMap()
  const regionData = populationData.filter(
    (item) => item.id_geometria == chartId
  )

  return (
    <div data-testid='chart'>
      <div className={styles.regionName}>{names[chartId - 1]}</div>
      <div className={styles.container}>
        {regionData.length > 0 ? (
          <>
            <div className={styles.label}>Population</div>
            <LineChart width={380} height={320} data={regionData}>
              <Line
                type='monotone'
                dataKey='populacao'
                stroke={getColor(chartId)}
                strokeWidth={2}
              />
              <CartesianGrid stroke='#ccc' />
              <XAxis dataKey='ano'>
                <Label value='Year' offset={-5} position='insideBottom' />
              </XAxis>
              <YAxis domain={[5000, 25000]} />
            </LineChart>
          </>
        ) : (
          <div className={styles.noRegionAlert}>
            Click a region to see its population growth.
          </div>
        )}
      </div>
    </div>
  )
}

export default MyChart
