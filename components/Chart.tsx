'use client'
import { useChart } from '@/hooks/useChart'
import styles from '@/styles/chart.module.sass'
import populationData from '@/lib/populacao_bairros.json'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Label } from 'recharts'
import { getColor } from '@/lib/functions'

function MyChart() {
  const { chartId } = useChart()
  const regionData = populationData.filter(
    (item) => item.id_geometria == chartId
  )

  const formattedRegionData = regionData.map((item) => ({
    x: +item.ano,
    y: +item.populacao
  }))

  const finalData = [
    {
      label: 'Population',
      data: formattedRegionData
    }
  ]

  console.log('populationData', populationData)
  console.log('regionData', regionData)
  console.log('finalData', finalData)

  return (
    <div className={styles.container}>
      {finalData[0].data.length > 0 && (
        <>
          <div className={styles.label}>Populacao</div>
          <LineChart width={380} height={320} data={finalData[0].data}>
            <Line type='monotone' dataKey='y' stroke={getColor(chartId)} />
            <CartesianGrid stroke='#ccc' />

            <XAxis dataKey='x'>
              <Label value='Ano' offset={-5} position='insideBottom' />
            </XAxis>
            <YAxis domain={[5000, 25000]} />
          </LineChart>
        </>
      )}
    </div>
  )
}

export default MyChart
