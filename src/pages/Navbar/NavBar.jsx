import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './NavBar.scss';

function NavBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <nav className="navbar">
      <div className="logo">Weather App</div>
      <div className="nav">
        <Link to="/">Accueil</Link>
        <Link to="/about">A propos</Link>
        <Link to="/contact">Contact</Link>
        <div className="search">
          <input
            type="text"
            placeholder="Rechercher une ville..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button onClick={handleSearch}>Recherche</button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
