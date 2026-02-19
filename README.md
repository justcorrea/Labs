# Labs

This repository contains project labs and a Vite + React demo for **Nocterra**, a stargazing app.

## Nocterra App

The app is located in: `nocterra-app/`

### Features
- Vite + React setup
- Leaflet full-screen interactive map
- 5 mock stargazing location pins
- Pin popup shows:
  - Name
  - Bortle scale
  - Description

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
│           └── LocationMap.jsx
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
