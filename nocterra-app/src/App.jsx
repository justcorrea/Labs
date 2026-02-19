import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import LocationMap from './components/LocationMap'
import SkyConditions from './components/SkyConditions'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import './styles.css'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

const mockSkyConditions = {
  cloudCover: '22% (placeholder)',
  moonPhase: 'Waxing Crescent (placeholder)',
  darknessRating: '7.8 / 10 (placeholder)',
}

function App() {
  return (
    <main className="app-shell">
      <section className="main-view" aria-label="Map view">
        <header className="overlay-header">
          <h1>Nocterra</h1>
          <p>Discover stargazing spots. Tap any pin for Bortle details.</p>
        </header>

        <SkyConditions conditions={mockSkyConditions} />
        <LocationMap />
      </section>


      <nav className="bottom-nav" aria-label="Primary navigation">
        <button type="button" className="nav-item active" aria-label="Map">
          <span className="nav-icon" aria-hidden="true">
            🗺️
          </span>
          <span>Map</span>
        </button>
        <button type="button" className="nav-item" aria-label="Feed">
          <span className="nav-icon" aria-hidden="true">
            📰
          </span>
          <span>Feed</span>
        </button>
        <button type="button" className="nav-item" aria-label="Add">
          <span className="nav-icon" aria-hidden="true">
            ➕
          </span>
          <span>Add</span>
        </button>
        <button type="button" className="nav-item" aria-label="Profile">
          <span className="nav-icon" aria-hidden="true">
            👤
          </span>
          <span>Profile</span>
        </button>
      </nav>
    </main>
  )
}

export default App
