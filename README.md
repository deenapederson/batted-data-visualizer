# Batted Data Visualization Tool

A web application that allows users to visualize and contextualize MLB Batted Data 

[Deployed Application](https://deenapederson.github.io/batted-data-visualizer/)

---

## Features

1. Overlay batted ball data on a general baseball field image.
2. Color-coded dots represent different play outcomes (e.g., Home Run, Triple, Out).
3. Hover tooltips display:
   - Hitter name
   - Launch angle
   - Exit velocity
   - Hit distance
   - Spin rate
   - Play outcome
4. Filter by:
   - Individual player
   - Play outcome
   - Hit type (e.g., Fly Ball, Ground Ball)

---

## Tech Stack

- React + Vite
- Recharts – Charting library for rendering data overlays
- Styled Components
- JavaScript (ES6)
- GitHub Pages (for deployment)

---

## Implementation Details

- The BattedBallData.csv file is parsed and enhanced with x and y coordinates, calculated from each hit's exit direction and distance to ensure accurate positioning on the field.
- Custom tooltip and dot components are styled dynamically based on data values to improve clarity and visual impact.
- Filtering is managed with React state, with useMemo used to optimize performance and avoid unnecessary re-renders.

---
## Architectural Decisions

- React Hooks for state and side effects (useState, useEffect, useMemo).
- Styling: Styled-components are used to provide component-scoped styles and support quick UI iteration.
- Manual coordinate transformation of polar data (angle + distance → x/y) to plot hits on a 2D field.

---

## Setup Instructions

Clone the repo and run locally:

```bash
git clone https://github.com/deenapederson/batted-data-visualizer.git
cd batted-data-visualizer
npm install
npm run dev
```
Deployment Instructions:
```
npm run build
npm run deploy
```

### Future Enhancements 
- Add Compare Mode: display a second chart for side-by-side comparisons of players, hit types, and outcomes
- Introduce range sliders to filter by launch angle, hit distance, and exit velocity
- Enable selection of custom field overlays (e.g., different MLB stadiums)
- Improve layout and interaction on smaller screen sizes
