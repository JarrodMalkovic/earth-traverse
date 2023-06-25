export type MapMarker = {
  position: Position
  connectedTo?: MapMarker
}

export type Position = {
  latitude: number
  longitude: number
}
