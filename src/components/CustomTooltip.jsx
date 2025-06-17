import styled from 'styled-components'

/**
 * CustomTooltip Component
 *
 * Renders a custom tooltip for recharts.
 *
 * Props:
 *  - active (boolean): Whether the tooltip is visible (from recharts).
 *  - payload (array): Data array from recharts; the first item contains fields like
 *      BATTER_FNAME, BATTER_LNAME, LAUNCH_ANGLE, EXIT_SPEED, HIT_DISTANCE, HIT_SPIN_RATE, PLAY_OUTCOME.
 */


const ToolTipContainer = styled.div`
  background-color: white;
  color: black;
  border: 1px solid #ccc;
  padding: 8px;
  font-size: 0.875rem;
  border-radius: 8px;

  transform: rotate(45deg);
  transform-origin: center;
`

const ToolTipTitle = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
`
const ToolTipDetail = styled.div`
  font-size: 0.75rem;
`

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload

    return (
      <ToolTipContainer>
        <ToolTipTitle><strong>{data.BATTER_FNAME} {data.BATTER_LNAME}</strong></ToolTipTitle>
        <ToolTipDetail>Launch Angle: <strong>{data.LAUNCH_ANGLE}°</strong></ToolTipDetail>
        <ToolTipDetail>Exit Velo: <strong>{data.EXIT_SPEED} mph</strong></ToolTipDetail>
        <ToolTipDetail>Distance: <strong>{data.HIT_DISTANCE} feet</strong></ToolTipDetail>
        <ToolTipDetail>Spin Rate: <strong>{data.HIT_SPIN_RATE} rpm</strong></ToolTipDetail>
        <ToolTipDetail>Play Outcome: <strong>{data.PLAY_OUTCOME}</strong></ToolTipDetail>
      </ToolTipContainer>
    )
  }
  return null
}

export default CustomTooltip
