import { useEffect, useMemo, useState } from 'react'
import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import { stargazingLocations } from '../data'

const defaultCenter = [39.5, -111.5]

function getBortleEducation(level) {
  if (level <= 2) {
    return {
      explanation:
        'Bortle 1–2 skies are exceptionally dark with minimal artificial light and excellent contrast for faint targets.',
      visible:
        'The Milky Way shows strong structure, zodiacal light is often obvious, and many faint nebulae/galaxies are visible.',
      example:
        'Example: Under Bortle 2, the Andromeda Galaxy appears extended and bright with clear surrounding star fields.',
    }
  }

  if (level <= 4) {
    return {
      explanation:
        'Bortle 3–4 skies are rural-dark to rural transition, offering strong deep-sky viewing with some distant light domes.',
      visible:
        'Milky Way detail is still strong, many Messier objects are easy, and brighter deep-sky targets photograph well.',
      example:
        'Example: At Bortle 4, Orion Nebula and the Pleiades remain impressive, though faint background dust is reduced.',
    }
  }

  if (level <= 6) {
    return {
      explanation:
        'Bortle 5–6 skies are suburban where skyglow begins to noticeably reduce contrast for faint objects.',
      visible:
        'Planets, the Moon, double stars, and brighter clusters are good targets; dim galaxies become challenging.',
      example:
        'Example: In Bortle 6, open clusters are enjoyable, but faint nebulae need filters and careful adaptation.',
    }
  }

  return {
    explanation:
      'Bortle 7–9 skies are urban/inner-city conditions with strong sky brightness and limited deep-sky contrast.',
    visible:
      'Best targets are the Moon, planets, and a short list of bright stars and clusters; Milky Way is usually not visible.',
    example:
      'Example: At Bortle 8, Jupiter and Saturn are clear, but most faint galaxies disappear into background glow.',
  }
}

function BortleEducationModal({ level, onClose }) {
  if (level === null) {
    return null
  }

  const content = getBortleEducation(level)

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="bortle-modal-title">
      <div className="modal-card">
        <h2 id="bortle-modal-title">Bortle Scale {level}</h2>

        <p>
          <strong>Explanation:</strong> {content.explanation}
        </p>

        <p>
          <strong>What is visible:</strong> {content.visible}
        </p>

        <p>
          <strong>Example:</strong> {content.example}
        </p>

        <button type="button" className="modal-close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  )
}

function RecenterMap({ userPosition }) {
  const map = useMap()

  useEffect(() => {
    if (userPosition) {
      map.setView(userPosition, 10)
    }
  }, [map, userPosition])

  return null
}

function PinDropHandler({ isPinDropMode, onMapClick }) {
  useMapEvents({
    click(event) {
      if (isPinDropMode) {
        onMapClick(event.latlng)
      }
    },
  })

  return null
}

function LocationMap() {
  const [userPosition, setUserPosition] = useState(null)
  const [locations, setLocations] = useState(stargazingLocations)
  const [isPinDropMode, setIsPinDropMode] = useState(false)
  const [pendingLatLng, setPendingLatLng] = useState(null)
  const [activeBortleLevel, setActiveBortleLevel] = useState(null)
  const [newLocationForm, setNewLocationForm] = useState({
    name: '',
    bortle: '4',
    description: '',
  })

  const userIcon = useMemo(
    () =>
      L.divIcon({
        className: 'user-location-marker',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      }),
    [],
  )

  useEffect(() => {
    if (!navigator.geolocation) {
      return
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setUserPosition([coords.latitude, coords.longitude])
      },
      () => {
        // If denied or unavailable, keep default map center.
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    )
  }, [])

  const handleAddSpotClick = () => {
    const nextMode = !isPinDropMode
    setIsPinDropMode(nextMode)

    if (!nextMode) {
      setPendingLatLng(null)
    }
  }

  const handleMapPinDrop = (latlng) => {
    setPendingLatLng(latlng)
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setNewLocationForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()

    if (!pendingLatLng) {
      return
    }

    const nextLocation = {
      id: Date.now(),
      name: newLocationForm.name.trim(),
      bortle: Number(newLocationForm.bortle),
      description: newLocationForm.description.trim(),
      position: [pendingLatLng.lat, pendingLatLng.lng],
    }

    setLocations((current) => [...current, nextLocation])
    setNewLocationForm({
      name: '',
      bortle: '4',
      description: '',
    })
    setPendingLatLng(null)
    setIsPinDropMode(false)
  }

  return (
    <div className="map-wrapper">
      <MapContainer center={defaultCenter} zoom={5} minZoom={3} className="map" scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <RecenterMap userPosition={userPosition} />
        <PinDropHandler isPinDropMode={isPinDropMode} onMapClick={handleMapPinDrop} />

        {userPosition && (
          <Marker position={userPosition} icon={userIcon}>
            <Popup>
              <h2 className="popup-title">You are here</h2>
              <p>Your current location is being used to center the map.</p>
            </Popup>
          </Marker>
        )}

        {pendingLatLng && (
          <Marker position={[pendingLatLng.lat, pendingLatLng.lng]}>
            <Popup>
              <h2 className="popup-title">New spot location</h2>
              <p>Complete the form to save this stargazing spot.</p>
            </Popup>
          </Marker>
        )}

        {locations.map((location) => (
          <Marker key={location.id} position={location.position}>
            <Popup>
              <h2 className="popup-title">{location.name}</h2>
              <p>
                <strong>Bortle Scale:</strong>{' '}
                <button
                  type="button"
                  className="bortle-link"
                  onClick={() => setActiveBortleLevel(location.bortle)}
                >
                  {location.bortle}
                </button>
              </p>
              <p>{location.description}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <button
        type="button"
        className={`add-spot-button ${isPinDropMode ? 'active' : ''}`}
        onClick={handleAddSpotClick}
      >
        +
      </button>

      {isPinDropMode && (
        <section className="pin-drop-instructions" aria-live="polite">
          Tap anywhere on the map to drop your new stargazing pin.
        </section>
      )}

      {pendingLatLng && (
        <form className="new-spot-form" onSubmit={handleFormSubmit}>
          <h2>Add Stargazing Spot</h2>

          <label htmlFor="spot-name">Location name</label>
          <input
            id="spot-name"
            name="name"
            value={newLocationForm.name}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="spot-bortle">Bortle scale</label>
          <select
            id="spot-bortle"
            name="bortle"
            value={newLocationForm.bortle}
            onChange={handleInputChange}
            required
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>

          <label htmlFor="spot-description">Description</label>
          <textarea
            id="spot-description"
            name="description"
            value={newLocationForm.description}
            onChange={handleInputChange}
            rows={3}
            required
          />

          <button type="submit">Save Spot</button>
        </form>
      )}

      <BortleEducationModal level={activeBortleLevel} onClose={() => setActiveBortleLevel(null)} />
    </div>
  )
}

export default LocationMap
