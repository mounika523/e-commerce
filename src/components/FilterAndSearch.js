// src/components/FilterAndSearch.js

import React, { useState } from 'react';
import './FilterAndSearch.css';
import { useCart } from '../context/CartContext'; // Import useCart hook

function FilterAndSearch({ products, onFilter }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const { cart } = useCart(); // Get cart from context

  const filterProducts = (term = searchTerm) => {
    const filtered = products.filter((product) => {
      const matchesSearch = term
        ? (product.title || '').toLowerCase().includes(term.toLowerCase())
        : true;

      const matchesCategory = selectedCategory
        ? product.category === selectedCategory
        : true;

      return matchesSearch && matchesCategory;
    });

    onFilter(filtered);
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term) {
      const relevantSuggestions = products.filter((product) =>
        product.title.toLowerCase().includes(term.toLowerCase())
      );
      setSuggestions(relevantSuggestions.slice(0, 5));
    } else {
      setSuggestions([]);
    }

    filterProducts(term);
  };

  const handleSearchIconClick = () => {
    setSuggestions([]);
    filterProducts();
  };

  // Define handleSuggestionClick
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.title);
    setSuggestions([]);
    filterProducts(suggestion.title); // Filter products based on clicked suggestion
  };

  return (
    <div className="header">
      <div className="site-name">
        <h1>E-commerce</h1>
      </div>

      <div className="search-category-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="search-icon" onClick={handleSearchIconClick}>
            🔍
          </button>
          {suggestions.length > 0 && (
            <ul className="suggestions">
              {suggestions.map((suggestion) => (
                <li key={suggestion.id} onClick={() => handleSuggestionClick(suggestion)}>
                  {suggestion.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="category-dropdown">
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              filterProducts();
            }}
          >
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelry</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>
        </div>

        {/* Cart Icon */}
        <div className="cart-icon">
          <span>🛒</span>
          <span>{cart.length}</span> {/* Display number of items in cart */}
        </div>
      </div>
    </div>
  );
}

export default FilterAndSearch;
