import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const StyledLink = styled(NavLink)`
  color: rgb(27, 27, 27);
  text-decoration: none;

  &.active {
    color: orange;
  }
`;
