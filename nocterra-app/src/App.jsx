import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import LocationMap from './components/LocationMap'
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

function App() {
  return (
    <main className="app-shell">
      <header className="overlay-header">
        <h1>Nocterra</h1>
        <p>Discover stargazing spots. Tap any pin for Bortle details.</p>
      </header>
      <LocationMap />
    </main>
  )
}

export default App
