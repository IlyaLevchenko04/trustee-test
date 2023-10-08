import React from 'react';
import { Outlet } from 'react-router-dom';
import { StyledLink } from './styledLink';
export const Header: React.FC = () => {
  return (
    <>
      <ul className="header-nav-list">
        <StyledLink to={'/'}>Home</StyledLink>
        <StyledLink to={'/helper'}>Helper</StyledLink>
      </ul>
      <Outlet />
    </>
  );
};
