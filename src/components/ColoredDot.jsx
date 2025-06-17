import { outcomeColorMap } from '../constants/options'

/**
 * ColoredDot Component
 *
 * Custom dot for recharts that maps play outcomes to colors and adjusts size based on filters.
 *
 * Props:
 *  - cx (number): X coordinate of the dot.
 *  - cy (number): Y coordinate of the dot.
 *  - payload (object): Data object containing play details, including PLAY_OUTCOME.
 *  - filters (object): Current filter state with keys like player and outcome.
 */

function ColoredDot({ cx, cy, payload, filters }) {
  const outcome = payload.PLAY_OUTCOME
  const fill = outcomeColorMap[outcome] || outcomeColorMap.Other

  const isFilterActive =
    filters?.player !== 'player-default' || filters?.outcome !== 'outcome-default' || filters?.hit_type !== 'type-default'

  const glowStyle = (outcome === 'HomeRun')
    ? {
        filter: 'drop-shadow(0 0 6px rgba(229, 228, 226, 0.8))',
        stroke: '#e5e4e2',
        strokeWidth: 0.5
      }
    : {}

  return (
    <circle
      cx={cx}
      cy={cy}
      r={isFilterActive ? 4 : 1.75}
      fill={fill}
      style={glowStyle}
    />
  )
}

export default ColoredDot
