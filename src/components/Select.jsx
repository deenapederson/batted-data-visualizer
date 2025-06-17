import styled from 'styled-components'

/**
 * Select Component
 *
 * A styled select for the to be used throughout the app
 *
 * Props:
 * - children (node): any components/content passed in
 * - ...props: any additional props passed
 */

const StyledSelect = styled.select`
  border: none;
  font-family: inherit;
  font-size: 14px;
  padding: 4px 0px;
  background-color: inherit;


  &:focus {
    outline: none;
  }
`


const Select = ({ children, ...props }) => {
  return (
    <StyledSelect {...props}>
      {children}
    </StyledSelect>
  )
}

export default Select
