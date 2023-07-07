'use client'
import { useContext, createContext, useState } from 'react'
import geometrias from '@/lib/geometrias_bairros.json'
import { getCenterCoordinates, getColor } from '@/lib/functions'

const MapContext = createContext()

const MapProvider = ({ children }) => {
  const [markers, setMarkers] = useState([])
  const [names, setNames] = useState([])
  const [chartId, setChartId] = useState(null)

  const handleApiLoaded = (map, maps) => {
    const coordinatesArrays = []
    const names = []
    const centers = []

    //get coordinates, names and centers
    geometrias.features.map((item) => {
      coordinatesArrays.push(item.geometry.coordinates[0][0])
      names.push(item.properties.name)
      centers.push(getCenterCoordinates(item.geometry.coordinates[0][0]))
    })

    //turn coordinates into objects
    const coordinatesObjects = coordinatesArrays.map((item, index) => {
      const coords = item.map((subItem) => {
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
        setChartId(chartId)
      })

      //set polygon on the map
      neighborhood.setMap(map)
    })

    setMarkers(centers)
    setNames(names)
  }

  return (
    <MapContext.Provider
      value={{
        handleApiLoaded,
        markers,
        names,
        chartId
      }}
    >
      {children}
    </MapContext.Provider>
  )
}

const useMap = () => useContext(MapContext)

export { MapProvider, useMap }
