import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Cart.css';
import { useCart } from '../context/CartContext'; 

function Cart() {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  // Calculate the total amount of the cart
  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Handle quantity change
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(itemId, newQuantity); // Ensure quantity is greater than 0
    }
  };

  // Navigate back to the product listing page
  const handleBackToProductListing = () => {
    navigate('/'); // Change this to the correct path of your product listing page
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty.</p>
      ) : (
        <div>
          <ul className="cart-items">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <p>Price: ${item.price}</p>

                  {/* Quantity selector as NumberInput */}
                  <div className="quantity-selector">
                    <label htmlFor={`quantity-${item.id}`}>Quantity: </label>
                    <input
                      type="number"
                      id={`quantity-${item.id}`}
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                      className="quantity-input"
                    />
                  </div>
                  <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
            <button onClick={clearCart}>Clear Cart</button>
          </div>
        </div>
      )}

      {/* Back to Product Listing Button */}
      <button onClick={handleBackToProductListing} className="back-to-listing-button">
        Back to Product Listing
      </button>
    </div>
  );
}

export default Cart;
