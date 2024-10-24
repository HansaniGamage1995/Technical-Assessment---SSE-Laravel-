import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children, open, toggleSidebar }) => (
  <div className="flex">
    {/* Sidebar */}
    <Sidebar open={open} />

    {/* Main Content */}
    <div className="flex-1 bg-gray-100 dark:bg-dark min-h-screen">
      {/* Header (for mobile toggle) */}
      <header className="flex items-center justify-between bg-white p-6 dark:bg-dark lg:hidden">
        <button
          onClick={toggleSidebar}
          className={`${
            open ? 'navbarTogglerActive' : ''
          } focus:ring-primary ring-2 p-2 rounded-md`}
        >
          <span className="block w-6 h-0.5 bg-gray-800 dark:bg-green-600 mb-1"></span>
          <span className="block w-6 h-0.5 bg-gray-800 dark:bg-green-600 mb-1"></span>
          <span className="block w-6 h-0.5 bg-gray-800 dark:bg-green-600"></span>
        </button>
        <h1 className="text-xl font-bold">Your App</h1>
      </header>

      {/* Component-specific content goes here */}
      <main className="p-6">{children}</main>
    </div>
  </div>
);

export default Layout;
