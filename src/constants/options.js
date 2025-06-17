// Color for each outcome
export const outcomeColorMap = {
  HomeRun: '#9b59b6',
  Triple: '#f5a623',
  Double: '#50e3c2',
  Single: '#4a90e2',
  Out: '#d9534f',
  Other: '#95a5a6'
}

// Launch angle classifications, as per https://www.mlb.com/glossary/statcast/launch-angle
export const launchClassifications = {
  GroundBall: [Number.NEGATIVE_INFINITY, 10],
  LineDrive: [10, 25],
  FlyBall: [25, 50],
  PopUp: [50, Number.POSITIVE_INFINITY]
}