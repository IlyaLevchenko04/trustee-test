import { nanoid } from 'nanoid';
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const links = [
  { href: '/', title: 'Home' },
  { href: '/helper', title: 'Helper' },
];

export const Header = () => (
  <>
    <nav className="nav">
      {links.map(({ href, title }) => (
        <NavLink
          key={nanoid()}
          to={href}
          className={({ isActive }) =>
            isActive
              ? 'text-orange-500 hover:text-orange-600 nav-link'
              : 'text-blue-500 hover:text-blue-600 nav-link'
          }
        >
          {title}
        </NavLink>
      ))}
    </nav>
    <Outlet />
  </>
);
