import React, { useState } from "react";
import "./productdetails.css";
import productimg from "../assets/clouds.jpg";

export default function ProductDetails({ title, price, imageUrl, description, onBuy }) {
  const [quantity, setQuantity] = useState(1);
  const maxQuantity = 5; // Example max limit

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
    }
  };

  return (
    <div className="product-details">
      <img src={productimg} alt={title} className="product-image" />

      <div className="product-info">
        <h2 className="product-title">{title}</h2>
        <p className="product-price">₱{price}</p>
        <p className="product-description">{description}</p>

        <div className="product-quantity">
          <label className="quantity-label">Quantity:</label>
          <div className="quantity-control">
            <button className="quantity-btn" onClick={handleDecrease}>−</button>
            <input
              type="text"
              value={quantity}
              readOnly
              className="quantity-input"
            />
            <button className="quantity-btn" onClick={handleIncrease}>+</button>
          </div>
          <span className="availability-note">Only {maxQuantity} available</span>
        </div>

        <button className="buy-button" onClick={onBuy}>
          Add to Cart
        </button>

        {/* Product Info Section */}
        
          <div className="info-row">
            <span className="info-label">Era:</span>
            <span className="info-value">1950s</span>
          </div>
          <div className="info-row">
            <span className="info-label">Condition:</span>
            <span className="info-value">Excellent</span>
          </div>
          <div className="info-row">
            <span className="info-label">Category:</span>
            <span className="info-value">Decorative</span>
          </div>
        </div>
      </div>
   
  );
}
