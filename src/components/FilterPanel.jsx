import React, { useState, useEffect, useMemo } from 'react'
import Select from './Select'
import Button from './Button'
import styled from 'styled-components'
import { outcomeColorMap,  launchClassifications} from '../constants/options'

/**
 * FilterPanel Component
 *
 * Displays filters and a legend for batted ball data.
 *
 * Props:
 *  - data (array): Array of batted ball objects, each with fields like BATTER_FNAME, BATTER_LNAME, PLAY_OUTCOME.
 *  - filters (object): Current filter values with keys: player, outcome, hit_type.
 *  - setFilters (function): Function to update filters; accepts a new filters object.
 *  - children (ReactNode, optional): Optional child elements.
 *  - ...props: Additional props passed to the container.
 */

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin: 0.5rem;

  width: 15rem;
  border: 1px solid white;
`

const Legend = styled.div`
  display: flex;
  flex-direction: column;
`


const LegendElement = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`

const PanelHeader = styled.strong`
  padding-top: 0.5rem;
  display: flex;
  justify-content: space-between;
`

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 8px;
  background-color: ${({ color }) => color};

  ${({ isHomeRun }) =>
    isHomeRun &&
    `
      box-shadow: 0 0 6px rgba(229, 228, 226, 0.8);
      border: solid 0.5px #e5e4e2;
    `}
`

function FilterPanel ({ children, data, filters, setFilters, ...props }){

  // Player Dropdown options
  const players = useMemo(() => {
    const names = data.map(d => `${d.BATTER_FNAME} ${d.BATTER_LNAME}`)
    return Array.from(new Set(names)).sort()
  }, [data])

  // Outcome Dropdown options
  const outcomes = useMemo(() => {
    const values = data
      .map(d => d.PLAY_OUTCOME)
      .filter(outcome => outcome !== undefined && outcome !== null && outcome !== "Undefined") // filter out invalid entries

    return Array.from(new Set(values)).sort()
  }, [data])

  // Hit type (launch) Dropdown options
  const launchTypeOptions = Object.keys(launchClassifications).sort()
  const colorMap = Object.entries(outcomeColorMap)

  return(
    <Panel>
      <h3 style={{ margin: 0}}>
        Batted Data Spray Chart
      </h3>

      {/* Color Legend: Hit outcomes and their associated color */}
      <PanelHeader>Legend</PanelHeader>
       <Legend>
        {colorMap.map(([label, color]) => (
          <LegendElement key={label}>
            <Dot color={color} isHomeRun={label === 'HomeRun'} />
            <span>{label}</span>
          </LegendElement>
        ))}
      </Legend>

      {/* Filtering options */}
      <PanelHeader>
        Filters 
        <Button onClick={()=> setFilters({
          player: 'player-default',
          outcome: 'outcome-default',
          hit_type: 'type-default'
        })}>
          Clear
        </Button>
      </PanelHeader>

      {/* Filter by specific Players */}
      <Select
        id='select-player'
        value={filters.player}
        onChange={(e) => {
          const value = e.target.value
          setFilters({
            ...filters,
            player: value,
          })
        }}
      >
        <option value='player-default'>Select Player</option>
        {players.map((name) => (
          <option key={name} value={name}>{name}</option>
        ))}
      </Select>

      {/* Filter by different Outcomes */}
      <Select
        id='select-outcome'
        value={filters.outcome}
        onChange={(e) => {
          const value = e.target.value
          setFilters({
            ...filters,
            outcome: value,
          })
        }}
      >
        <option value='outcome-default'>Select Outcome</option>
        {/* Add in Hit as an option: includes single, double, triple, homerun */}
        <option value='Hit'>Hit</option> 
        {outcomes.map((name) => (
          <option key={name} value={name}>{name}</option>
        ))}
      </Select>

      {/* Filter by different Hit Types: Pop up, Fly Ball, Ground Ball, Line Drive */}
      <Select
        id='select-type'
        value={filters.hit_type}
        onChange={(e) => {
          const value = e.target.value
          setFilters({
            ...filters,
            hit_type: value,
          })
        }}
      >
        <option value='type-default'>Select Hit Type</option>
        {launchTypeOptions.map((name) => (
          <option key={name} value={name}>{name}</option>
        ))}
      </Select>

      {/* Disclaimers and Notes */}
      <PanelHeader>Note:</PanelHeader>
      <ul style={{ paddingLeft: '1rem', margin: '0px'}}>
        <li><small>MLB stadiums vary in size and shape. The stadium overlay is included for visualization purposes and does not accurately represent the exact dimensions of every stadium where these hits occurred.</small></li>
        <li><small>Hit Type <a href='https://www.mlb.com/glossary/statcast/launch-angle' target='_blank'>classification breakdown</a>.</small></li>
        <li><small><a href='https://pngtree.com/freepng/cartoon-batting-baseball-field-clipart_6003282.html' target='_blank'>image from pngtree.com/</a></small></li>
      </ul>
      

    </Panel>

  )
}

export default FilterPanel