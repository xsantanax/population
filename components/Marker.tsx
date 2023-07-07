import styles from '@/styles/marker.module.sass'
import { LightBulbIcon } from '@heroicons/react/24/outline'

function Marker({}: any) {
  return (
    <div className={styles.marker}>
      <LightBulbIcon className={styles.icon} fill='#f8f808' />
    </div>
  )
}

export default Marker
