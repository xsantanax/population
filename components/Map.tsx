'use client'
import GoogleMapReact from 'google-map-react'
import geometrias from '@/geometrias_bairros.json'
import { useState } from 'react'
import styles from '@/styles/map.module.sass'
import { LightBulbIcon } from '@heroicons/react/24/outline'

const Marker = ({}: any) => (
  <div className={styles.marker} onClick={() => console.log('clicked')}>
    <LightBulbIcon className={styles.icon} fill='#f8f808' />
  </div>
)

function getCenterCoordinates(coordinates: any) {
  var totalLat = 0
  var totalLng = 0

  for (var i = 0; i < coordinates.length; i++) {
    totalLat += coordinates[i][1]
    totalLng += coordinates[i][0]
  }

  var centerLat = totalLat / coordinates.length
  var centerLng = totalLng / coordinates.length

  return [centerLng, centerLat]
}

function color(index: number) {
  return index == 0
    ? '#FF0000'
    : index == 1
    ? '#0000FF'
    : index == 2
    ? '#22BBCC'
    : '#FF00FF'
}

export default function Map() {
  const [markers, setMarkers] = useState<number[][]>([])

  const defaultProps = {
    center: {
      lat: -23.218,
      lng: -45.915
    },
    zoom: 14
  }

  const handleApiLoaded = (map: any, maps: any) => {
    const coordinatesArrays: number[][][] = []
    const names: string[] = []
    const centers: number[][] = []

    //get coordinates, names and centers
    geometrias.features.map((item) => {
      coordinatesArrays.push(item.geometry.coordinates[0][0])
      names.push(item.properties.name)
      centers.push(getCenterCoordinates(item.geometry.coordinates[0][0]))
    })

    //turn coordinates into objects
    const coordinatesObjects = coordinatesArrays.map((item, index) => {
      const coords = item.map((subItem: any) => {
        const obj = { lat: null, lng: null }
        obj.lng = subItem[0]
        obj.lat = subItem[1]
        return obj
      })
      return coords
    })

    coordinatesObjects.map((coords, index) => {
      const neighborhood = new maps.Polygon({
        paths: coords,
        strokeColor: color(index),
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: color(index),
        fillOpacity: 0.35
      })

      neighborhood.setMap(map)
    })

    console.log(coordinatesArrays)
    console.log(names)
    console.log(centers)

    setMarkers([...centers])
  }

  console.log(markers)

  return (
    <div style={{ height: '800px', width: '800px' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_MAPS_API_KEY || '' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        {markers.map((item, index) => (
          <Marker key={index} lat={item[1]} lng={item[0]} />
        ))}
      </GoogleMapReact>
    </div>
  )
}
