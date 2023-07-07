'use client'
import Map from '@/components/Map'
import Chart from '@/components/Chart'
import styles from '@/styles/app.module.sass'
import { MapProvider } from '@/hooks/useMap'

export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.intro}>
        This is a simple web interface where you can find information about
        neighborhoods population in Sao Jose dos Campos by clicking them on the
        map.
      </div>
      <MapProvider>
        <Map />
        <Chart />
      </MapProvider>
    </main>
  )
}
