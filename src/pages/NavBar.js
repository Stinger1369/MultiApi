import React, { useState } from 'react';

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
      <input
        type="text"
        placeholder="Rechercher une ville..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button onClick={handleSearch}>Recherche</button>
    </nav>
  );
}

export default NavBar;
