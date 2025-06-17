import React, { useState, useEffect, useMemo } from 'react'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import useBattedBallData from './hooks/useParsedCSV'
import styled from 'styled-components'
import FilterPanel from './components/FilterPanel'
import CustomTooltip from './components/CustomTooltip'
import ColoredDot from './components/ColoredDot'
import { launchClassifications } from './constants/options'

/**
 * Main App
 *
 * App with react rechart displaying BattedBallData. Includes an overlay over generic baseball fields.
 * Contains filters to sort for individual players, different outcomes, and different hit types.
 *
 */


const Container = styled.div`
  display: flex;
  height: 100vh;
  min-height: 100vh;
`
const PanelWrapper = styled.div`
  flex: 0 0 auto;
  height: 100vh;
  position: sticky;
  top: 0;
  z-index: 1;
`

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 0;
  transform: translateY(-2rem) translateX(10rem);

  position: relative;
  padding: 2rem;
`

const ChartArea = styled.div`
  position: relative;
  width: 700px;
  height: 700px;
`

const BackgroundImage = styled.div`
  position: absolute;
  width: 1000px;
  height: 1000px;
  top: -30px;
  left: -150px;
  background-image: url('/batted-data-visualizer/baseball-field.png');
  background-size: cover;
  background-position: center;
  z-index: 0;
  pointer-events: none;
`

const RotatedChart = styled.div`
  transform: rotate(-45deg);
  transform-origin: center;
  width: 100%;
  height: 100%;
  z-index: 1;
`

function App() {
  const data = useBattedBallData();
  const [filters, setFilters] = useState({
    player: 'player-default',
    outcome: 'outcome-default',
    hit_type: 'type-default'
  })

  // filter batted datapoints to display based on user filters
  const filteredData = useMemo(() => {
    const hitOutcomes = ['Single', 'Double', 'Triple', 'HomeRun'];
    return data.filter(d => {

      const isValid =
        d.PLAY_OUTCOME !== undefined &&
        d.BATTER_FNAME &&
        d.BATTER_LNAME &&
        d.LAUNCH_ANGLE !== undefined &&
        d.HIT_SPIN_RATE !== undefined &&
        d.HIT_DISTANCE !== undefined && 
        d.EXIT_SPEED !== undefined

      if (!isValid) return false
      
      const matchesPlayer =
        filters.player === 'player-default' ||
        `${d.BATTER_FNAME} ${d.BATTER_LNAME}` === filters.player

      const matchesOutcome =
        filters.outcome === 'outcome-default' ||
        (filters.outcome === 'Hit' && hitOutcomes.includes(d.PLAY_OUTCOME)) ||
        d.PLAY_OUTCOME === filters.outcome

      const matchesHitType = (() => {
        if (filters.hit_type === 'type-default') return true
        const [minAngle, maxAngle] = launchClassifications[filters.hit_type] || []
        return d.LAUNCH_ANGLE >= minAngle && d.LAUNCH_ANGLE < maxAngle
      })()

      return matchesPlayer && matchesOutcome && matchesHitType
    })
  }, [data, filters])


  return (
    <Container>
      <PanelWrapper>
        <FilterPanel
          data={data}
          filters={filters}
          setFilters={setFilters}
        />
      </PanelWrapper>

      <ContentContainer>
        <ChartArea>
          <BackgroundImage />
          <RotatedChart>
            <ResponsiveContainer width="100%" aspect={1}>
              <ScatterChart
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
              >
                <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                <XAxis
                  type="number"
                  dataKey="x"
                  domain={[-50, 450]}
                  ticks={[0, 100, 200, 300, 400]}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  domain={[-50, 450]}
                  ticks={[0, 100, 200, 300, 400]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Scatter
                  name="Hits"
                  data={filteredData}
                  shape={(props) => <ColoredDot filters={filters} {...props} />}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </RotatedChart>
        </ChartArea>
      </ContentContainer>
    </Container>
  )
}

export default App
