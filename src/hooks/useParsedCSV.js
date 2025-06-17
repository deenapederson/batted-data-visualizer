import { useEffect, useState } from 'react'

/**
 * useBattedBallData Hook
 *
 * Loads and parses batted ball data from a CSV file at '/BattedBallData.csv'.
 * Converts EXIT_DIRECTION and HIT_DISTANCE into x, y coordinates for plotting.
 * Filters out entries with invalid or out-of-range coordinates.
 *
 * Returns:
 *  - data (array): Array of parsed and filtered batted ball objects with added `x` and `y` properties.
 */

export default function useBattedBallData() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + '/BattedBallData.csv')
      .then(res => res.text())
      .then(csvText => {
        const lines = csvText.trim().split('\n')
        const headers = lines[0].split(',').map(h => h.trim())

        const rows = lines.slice(1).map(line => {
          const values = line.split(',').map(val => val.trim().replace(/^"|"$/g, ''))
          const entry = {}

          headers.forEach((header, i) => {
            const val = values[i]
            entry[header] = isNaN(val) ? val : parseFloat(val)
          })

          // convert angle from given (-45 down 3B - 45 down 1B) to (0 down 1B to 90 down 3B)
          const angleDeg = 45 - entry.EXIT_DIRECTION
          const distance = entry.HIT_DISTANCE

          if (!isNaN(angleDeg) && !isNaN(distance)) {
            const angleRad = (angleDeg * Math.PI) / 180
            entry.x = distance * Math.cos(angleRad)
            entry.y = distance * Math.sin(angleRad)
          } else {
            entry.x = null
            entry.y = null
          }

          return entry
        })

        const filtered = rows.filter(entry =>
          entry.x !== null && entry.y !== null &&
          (entry.x >= -50 && entry.y >= -50)
        )

        setData(filtered)
      })
      .catch((error) => console.error(error))
  }, [])

  return data
}
