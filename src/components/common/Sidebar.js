import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ open }) => (
  <aside
    className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-dark-2 shadow-lg transition-transform transform ${
      open ? 'translate-x-0' : '-translate-x-full'
    } lg:translate-x-0 lg:relative lg:w-64 lg:block lg:h-auto`}
  >
    <div className="p-6">
      <a href="/#" className="block w-full py-5">
        <img
          src="https://cdn.tailgrids.com/2.0/image/assets/images/logo/logo-primary.svg"
          alt="logo"
        />
        <img
          src="https://cdn.tailgrids.com/2.0/image/assets/images/logo/logo-white.svg"
          alt="logo"
          className="hidden dark"
        />
      </a>
    </div>

    <nav>
      <ul className="space-y-4 p-6">
        <ListItem NavLink="/">Home</ListItem>
        <ListItem NavLink="/product">Products</ListItem>
        <ListItem NavLink="/orders">Orders</ListItem>
        <ListItem NavLink="/blog">Blog</ListItem>
      </ul>
    </nav>
  </aside>
);

export default Sidebar;

const ListItem = ({ children, NavLink }) => (
  <li>
    <Link
      to={NavLink}
      className="block py-2 text-base font-medium text-body-color hover:text-dark dark:text-dark-6 dark:hover:text-green-600"
    >
      {children}
    </Link>
  </li>
);
