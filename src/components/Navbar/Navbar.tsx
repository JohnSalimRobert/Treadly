import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { pathname } = useLocation();

  const navStyle = (path: string) =>
    `mx-2 px-4 py-2 rounded-md font-medium transition-colors duration-200
     ${
       pathname.startsWith(path)
         ? 'bg-[var(--color-threadly-accent)] text-[var(--color-threadly-text)]'
         : 'text-white hover:bg-[var(--color-threadly-secondary)] hover:text-[var(--color-threadly-text)]'
     }`;

  return (
    <div className="bg-[var(--color-threadly-primary)] text-white flex justify-between items-center px-6 py-4 shadow-md font-[var(--font-threadly)]">
      <h1 className="text-xl font-bold tracking-wide">Threadly</h1>
      <div>
        <Link to="/" className={navStyle('/')}>
          My Feed
        </Link>
        <Link to="/profile" className={navStyle('/profile')}>
          My Profile
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
