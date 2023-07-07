'use client'
import GoogleMapReact from 'google-map-react'
import { useMap } from '@/hooks/useMap'
import Marker from '@/components/Marker'

const defaultProps = {
  center: {
    lat: -23.218,
    lng: -45.915
  },
  zoom: 14
}

export default function Map() {
  const { handleApiLoaded, markers } = useMap()

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
        {markers.map((item: any, index: number) => (
          <Marker key={index} lat={item[1]} lng={item[0]} />
        ))}
      </GoogleMapReact>
    </div>
  )
}
