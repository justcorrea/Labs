function SkyConditions({ conditions }) {
  return (
    <aside className="sky-conditions-panel" aria-label="Sky conditions">
      <h2>Sky Conditions</h2>
      <ul>
        <li>
          <span>Cloud cover</span>
          <strong>{conditions.cloudCover}</strong>
        </li>
        <li>
          <span>Moon phase</span>
          <strong>{conditions.moonPhase}</strong>
        </li>
        <li>
          <span>Darkness rating</span>
          <strong>{conditions.darknessRating}</strong>
        </li>
      </ul>
      <p className="sky-conditions-note">Mock values for now — ready to replace with API data.</p>
    </aside>
  )
}

export default SkyConditions
