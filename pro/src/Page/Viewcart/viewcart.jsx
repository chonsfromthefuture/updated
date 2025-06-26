import React, { useState } from "react";
import Header from "../../Compo/Header/Header";
import "./ViewCart.css";
import prdImg from "../../assets/clouds.jpg";

export default function ViewCart() {
  const [cartData, setCartData] = useState([
    {
      seller: "Pluspower.PH",
      items: [
        {
          title: "COD 3110 cellphone tripod camera long tripod...",
          image: prdImg,
          originalPrice: 299,
          salePrice: 109,
          quantity: 1,
          selected: false,
        },
      ],
    },
    {
      seller: "boutique_case",
      items: [
        {
          title: "Smilee 3110 Cellphone Tripod Camera...",
          image: prdImg,
          originalPrice: 250,
          salePrice: 105,
          quantity: 1,
          selected: false,
        },
      ],
    },
    {
      seller: "PINOY PAWNSTAR",
      items: [
        {
          title: "1900 jacket",
          image: prdImg,
          originalPrice: 250,
          salePrice: 105,
          quantity: 1,
          selected: false,
        },
      ],
    },
  ]);

  const handleSelectAll = (e) => {
    const checked = e.target.checked;
    const updated = cartData.map(group => ({
      ...group,
      items: group.items.map(item => ({ ...item, selected: checked })),
    }));
    setCartData(updated);
  };

  const handleSelectItem = (groupIndex, itemIndex) => {
    const updated = [...cartData];
    updated[groupIndex].items[itemIndex].selected = !updated[groupIndex].items[itemIndex].selected;
    setCartData(updated);
  };

  const handleIncrease = (groupIndex, itemIndex) => {
    const updated = [...cartData];
    updated[groupIndex].items[itemIndex].quantity += 1;
    setCartData(updated);
  };

  const handleDecrease = (groupIndex, itemIndex) => {
    const updated = [...cartData];
    if (updated[groupIndex].items[itemIndex].quantity > 1) {
      updated[groupIndex].items[itemIndex].quantity -= 1;
      setCartData(updated);
    }
  };

  const handleDeleteSelected = () => {
    const updated = cartData.map(group => ({
      ...group,
      items: group.items.filter(item => !item.selected)
    })).filter(group => group.items.length > 0);
    setCartData(updated);
  };

  const totalSelectedItems = cartData.reduce(
    (sum, group) => sum + group.items.filter(item => item.selected).length,
    0
  );

  const totalPrice = cartData.reduce(
    (sum, group) =>
      sum +
      group.items
        .filter(item => item.selected)
        .reduce((s, item) => s + item.salePrice * item.quantity, 0),
    0
  );

  return (
    <div>
      <Header />
      <main className="cart-container">
        <h2>Your Cart</h2>

        {cartData.map((group, groupIndex) => (
          <div key={groupIndex} className="cart-group">
            <div className="seller-row">
              <input type="checkbox" />
              <span className="seller-name">{group.seller}</span>
            </div>

            {group.items.map((item, itemIndex) => (
              <div key={itemIndex} className="cart-item">
                <input
                  type="checkbox"
                  checked={item.selected || false}
                  onChange={() => handleSelectItem(groupIndex, itemIndex)}
                />
                <img src={item.image} alt={item.title} className="item-img" />

                <div className="item-details">
                  <p className="item-title">{item.title}</p>
                  <div className="price-row">
                    <span className="original-price">₱{item.originalPrice}</span>
                    <span className="sale-price">₱{item.salePrice}</span>
                  </div>
                </div>

                <div className="quantity-control">
                  <button
                    className="quantity-btn"
                    onClick={() => handleDecrease(groupIndex, itemIndex)}
                  >
                    −
                  </button>
                  <input
                    type="text"
                    value={item.quantity}
                    readOnly
                    className="quantity-input"
                  />
                  <button
                    className="quantity-btn"
                    onClick={() => handleIncrease(groupIndex, itemIndex)}
                  >
                    +
                  </button>
                </div>

                <div className="total-section">
                  <p className="total-price">₱{item.salePrice * item.quantity}</p>
                  <button className="delete-btn">Delete</button>
                </div>
              </div>
            ))}
          </div>
        ))}

        {/* ✅ Footer Section */}
        <div className="cart-footer">
          <div className="footer-left">
            <input type="checkbox" onChange={handleSelectAll} />
            <span>Select All ({totalSelectedItems})</span>
            <button onClick={handleDeleteSelected}>Delete</button>
            <span className="move-to-likes">Move to My Likes</span>
          </div>
          <div className="footer-right">
            <span className="total-label">
              Total ({totalSelectedItems} item): <b>₱{totalPrice}</b>
            </span>
            <button className="checkout-btn">Check Out</button>
          </div>
        </div>
      </main>
    </div>
  );
}
