import styled from 'styled-components'

/**
 * Button Component
 *
 * Renders reusable button
 *
 * Props:
 *  - children: content to display in button
 *  - onClick: onClick handler passed from parent
 *  - props: any additional props to pass directly in
 */

const StyledButton = styled.button`
  padding: 4px 16px;
  border: 1px solid white;
  border-radius: 8px;
  font-size: 12px;

  font-family: inherit;

  transition: 0.2s all ease;

  cursor: pointer;

`

const Button = ({ children, onClick, ...props }) => {
  return (
    <StyledButton onClick={onClick} {...props}>
      {children}
    </StyledButton>
  )
}

export default Button