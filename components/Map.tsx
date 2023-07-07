'use client'
import GoogleMapReact from 'google-map-react'
import geometrias from '@/lib/geometrias_bairros.json'
import { useState } from 'react'
import { getCenterCoordinates, getColor } from '@/lib/functions'
import Marker from './Marker'
import { useChart } from '@/hooks/useChart'

const defaultProps = {
  center: {
    lat: -23.218,
    lng: -45.915
  },
  zoom: 14
}

export default function Map() {
  const { setChartId } = useChart()
  const [markers, setMarkers] = useState<number[][]>([])

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

    //create map objects (polygons)
    coordinatesObjects.map((coords, index) => {
      const chartId = index + 1
      const neighborhood = new maps.Polygon({
        paths: coords,
        strokeColor: getColor(chartId),
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: getColor(chartId),
        fillOpacity: 0.35
      })

      // Add click event listener to the polygon
      maps.event.addListener(neighborhood, 'click', () => {
        console.log('Polygon ' + chartId + ' clicked!')
        setChartId(chartId)
      })

      //set polygon on the map
      neighborhood.setMap(map)
    })

    console.log(coordinatesArrays)
    console.log(names)
    console.log(centers)

    setMarkers([...centers])
  }

  console.log(markers)

  return (
    <div style={{ height: '680px', width: '680px' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_MAPS_API_KEY || '' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        options={{
          clickableIcons: true,
          disableDoubleClickZoom: true
        }}
      >
        {markers.map((item, index) => (
          <Marker key={index} lat={item[1]} lng={item[0]} />
        ))}
      </GoogleMapReact>
    </div>
  )
}
