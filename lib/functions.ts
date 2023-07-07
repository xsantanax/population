export function getCenterCoordinates(coordinates: any) {
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

export function getColor(index: number) {
  return index == 0
    ? '#FF0000'
    : index == 1
    ? '#0000FF'
    : index == 2
    ? '#22BBCC'
    : '#FF00FF'
}
