import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FilterAndSearch from './FilterAndSearch';
import './ProductList.css';
import { useCart } from '../context/CartContext'; 

function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popupMessage, setPopupMessage] = useState(null);  // State for popup message

  const { addToCart, cart } = useCart(); // Get addToCart function from context, and cart to track added items

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

  // Handle adding product to cart and showing popup
  const handleAddToCart = (product) => {
    addToCart(product);
    setPopupMessage(`${product.title} added to cart!`);  // Show popup with product title
    setTimeout(() => setPopupMessage(null), 3000);  // Hide popup after 3 seconds
  };

  const handleFilter = (filtered) => {
    setFilteredProducts(filtered);
  };

  // Check if product is in the cart
  const isProductInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  if (loading) {
    return <div className="loading">
      <div className='spinner'></div>
    </div>;
  }

  if (error) {
    return <div className="error" >Error fetching products: {error.message}</div>;
  }

  return (
    <div>
      <FilterAndSearch products={products} onFilter={handleFilter} />

      {/* Popup Notification */}
      {popupMessage && (
        <div className="popup-notification">
          <p>{popupMessage}</p>
        </div>
      )}

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

            <button 
              onClick={() => handleAddToCart(product)} 
              className="add-to-cart-button"
              disabled={isProductInCart(product.id)} // Disable if already added
            >
              {isProductInCart(product.id) ? 'Added' : 'Add to Cart'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
