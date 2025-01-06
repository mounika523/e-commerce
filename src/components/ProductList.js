// src/components/ProductList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FilterAndSearch from './FilterAndSearch';
import './ProductList.css'; 
import { useCart } from '../context/CartContext'; // Import the useCart hook

function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useCart(); // G
  // et addToCart function from context

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleFilter = (filtered) => {
    setFilteredProducts(filtered);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error fetching products: {error.message}</div>;
  }

  return (
    <div>
      <FilterAndSearch products={products} onFilter={handleFilter} />

      <div className="product-list">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-item">
            <div className="product-content">
            <Link to={`/product/${product.id}`}>
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p className="price">${product.price}</p>
              <p className="category">{product.category}</p>
            </Link>
            </div>
            {/* Add to Cart Button */}
            <button onClick={() => addToCart(product)}className='add-to-cart-button'>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
