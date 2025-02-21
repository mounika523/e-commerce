import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import './ProductDetails.css'; 

function ProductDetails() {
  const { id } = useParams(); // Extract the product id from the URL
  const navigate = useNavigate(); // Initialize useNavigate
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div className="error">Error fetching product details: {error.message}</div>;
  }

  return (
    <div className="product-details">
      <div className="product-image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-info">
        <h2>{product.title}</h2>
        <p className="description">{product.description}</p>
        <p className="price">${product.price}</p>
        <p className="rating">Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
        <p className="category">{product.category}</p>
        <button
          className="back-button"
          onClick={() => navigate('/')}
        >
          Back to Listing Page
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
