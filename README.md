# Labs

This repository contains project labs and a Vite + React demo for **Nocterra**, a stargazing app.

## Nocterra App

The app is located in: `nocterra-app/`

### Features
- Vite + React setup
- Leaflet full-screen interactive map
- Mobile app-style layout with bottom navigation (Map, Feed, Add, Profile)
- Centered floating action button above bottom navigation
- Sky conditions panel with placeholder values for cloud cover, moon phase, and darkness rating
- 5 mock stargazing location pins
- Pin popup shows:
  - Name
  - Bortle scale (tap number for education modal)
  - Description
- Bortle education modal with:
  - Scale explanation
  - What is visible at that level
  - Example observing description
- Community add spot flow:
  - Tap floating `+` button to enable pin drop mode
  - Tap map to place a new pin
  - Fill location name, Bortle scale, and description

### Project Structure

```text
.
├── README.md
├── nocterra-app
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src
│       ├── App.jsx
│       ├── data.js
│       ├── main.jsx
│       ├── styles.css
│       └── components
│           ├── LocationMap.jsx
│           └── SkyConditions.jsx
├── stargazing-community-app-design.md
└── aws-ec2-basics
    └── ec2-setup-walkthrough.md
```

## Run Locally

1. Go to the app folder:
```bash
cd nocterra-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the dev server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview production build:
```bash
npm run preview
```
