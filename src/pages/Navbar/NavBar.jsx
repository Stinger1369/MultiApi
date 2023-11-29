import React, { useState } from 'react';
import './NavBar.css';

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
      <input
        type="text"
        placeholder="Rechercher une ville..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button onClick={handleSearch}>Recherche</button>
      </div>
     
    </nav>
  );
}

export default NavBar;
