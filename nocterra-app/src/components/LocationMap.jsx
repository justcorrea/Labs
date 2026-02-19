import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { stargazingLocations } from '../data'

function LocationMap() {
  return (
    <MapContainer
      center={[39.5, -111.5]}
      zoom={5}
      minZoom={3}
      className="map"
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {stargazingLocations.map((location) => (
        <Marker key={location.id} position={location.position}>
          <Popup>
            <h2 className="popup-title">{location.name}</h2>
            <p>
              <strong>Bortle Scale:</strong> {location.bortle}
            </p>
            <p>{location.description}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default LocationMap
