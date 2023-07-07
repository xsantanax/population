'use client'
import GoogleMapReact from 'google-map-react'
import geometrias from '@/geometrias_bairros.json'

// const AnyReactComponent = ({ text }: any) => (
//   <div>
//     <b>{text}</b>
//   </div>
// )

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
  const defaultProps = {
    center: {
      lat: -23.218,
      lng: -45.915
    },
    zoom: 14
  }

  const handleApiLoaded = (map: any, maps: any) => {
    const neighborhoods: number[][][] = []
    geometrias.features.map((item) => {
      neighborhoods.push(item.geometry.coordinates[0][0])
    })

    neighborhoods.map((item, index) => {
      const coords = item.map((subItem: any) => {
        const obj = { lat: null, lng: null }
        obj.lng = subItem[0]
        obj.lat = subItem[1]
        return obj
      })

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
  }

  return (
    <div style={{ height: '800px', width: '800px' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_MAPS_API_KEY || '' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        {/* <AnyReactComponent lat={-23.2} lng={-45.9} text='Look at Me!!!' /> */}
      </GoogleMapReact>
    </div>
  )
}
