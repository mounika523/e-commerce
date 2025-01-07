import React, { useState, useEffect, useCallback } from 'react';
import './FilterAndSearch.css';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function FilterAndSearch({ products, onFilter }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOption, setSortOption] = useState('');
  const { cart } = useCart();
  const navigate = useNavigate();

  // Memoize applyFilters to prevent unnecessary re-renders
  const applyFilters = useCallback(() => {
    const filteredProducts = products.filter((product) => {
      const matchesSearch = searchTerm
        ? product.title.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      const matchesCategory = selectedCategory
        ? product.category === selectedCategory
        : true;
      return matchesSearch && matchesCategory;
    });

    if (sortOption === 'price-low-to-high') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high-to-low') {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating-high-to-low') {
      filteredProducts.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    }

    onFilter(filteredProducts); // Pass filtered products to parent
  }, [products, searchTerm, selectedCategory, sortOption, onFilter]);

  // Debounced Search Function
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      applyFilters();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [applyFilters]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleCartIconClick = () => {
    navigate('/cart');
  };

  return (
    <div className="header">
      <div className="site-name">
        <h1>E-commerce</h1>
      </div>

      <div className="search-category-container">
        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="search-icon" onClick={applyFilters}>
            🔍
          </button>
        </div>

        {/* Category Dropdown */}
        <div className="category-dropdown">
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelry</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>
        </div>

        {/* Sort Dropdown */}
        <div className="sort-dropdown">
          <select value={sortOption} onChange={handleSortChange}>
            <option value="">Sort by</option>
            <option value="price-low-to-high">Price: Low to High</option>
            <option value="price-high-to-low">Price: High to Low</option>
            <option value="rating-high-to-low">Rating: High to Low</option>
          </select>
        </div>

        {/* Cart Icon */}
        <div className="cart-icon" onClick={handleCartIconClick}>
          <span>🛒</span>
          <span>{cart.length}</span>
        </div>
      </div>
    </div>
  );
}

export default FilterAndSearch;
