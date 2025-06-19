import React, { useState } from 'react';
import Header from "../../Compo/Header/Header";
import Sidebar from "../../Compo/Sidebar/Sidebar";
import styles from "./SellerPageItem.module.css";

export default function SellerPageItem() {
  const [verified, setVerified] = useState('');
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const selected = Array.from(e.target.files).slice(0, 3);
    setImages(selected);
  };

  return (
    <div>
      <Header showSearchBar={true} />
      <div className={styles.container}>
        <Sidebar />
        <main className={styles.content}>
          <h2 className={styles.mainHeading}>Add Item</h2>

          {/* Item Name & Price Row */}
          <div className={styles.formRow}>
            <div className={styles.formCol}>
              <label htmlFor="ItemName" className={styles.label}>Item Name</label>
              <input
                type="text"
                id="ItemName"
                className={`${styles.input} ${styles.itemNameInput}`}
                placeholder="e.g. Vintage Clock"
              />
            </div>
            <div className={styles.formCol}>
              <label htmlFor="price" className={styles.label}>Price (₱)</label>
              <input
                type="number"
                id="price"
                className={`${styles.input} ${styles.priceInput}`}
                placeholder="e.g. 99.99"
              />
            </div>
          </div>

          {/* Category & Image Upload Row */}
          <div className={styles.formRow}>
            <div className={styles.formCol}>
              <label htmlFor="category" className={styles.label}>Category</label>
              <input
                type="text"
                id="category"
                className={`${styles.input} ${styles.categoryInput}`}
                placeholder="e.g. Collectibles"
              />
            </div>
            <div className={styles.formCol}>
              <label htmlFor="image" className={styles.label}>Upload Image (Max: 3)</label>
              <input
                type="file"
                id="image"
                className={`${styles.inputFile} ${styles.imageInput}`}
                multiple
                accept="image/*"
                onChange={handleImageChange}
              />
              <div className={styles.previewContainer}>
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={URL.createObjectURL(img)}
                    className={styles.imagePreview}
                    alt={`preview-${idx}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Verified Radio */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Verified</label>
            <div className={styles.radioGroup}>
              <label>
                <input
                  type="radio"
                  name="verified"
                  value="yes"
                  checked={verified === 'yes'}
                  onChange={() => setVerified('yes')}
                  className={styles.radioYes}
                /> Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="verified"
                  value="no"
                  checked={verified === 'no'}
                  onChange={() => setVerified('no')}
                  className={styles.radioNo}
                /> No
              </label>
            </div>
          </div>

          {/* Historian Fields (Only if verified) */}
          {verified === 'yes' && (
            <div className={styles.formRow}>
              <div className={styles.formCol}>
                <label htmlFor="historianName" className={styles.label}>Historian Name</label>
                <input
                  type="text"
                  id="historianName"
                  className={`${styles.input} ${styles.historianNameInput}`}
                  placeholder="e.g. Dr. Jose Rizal"
                />
              </div>
              <div className={styles.formCol}>
                <label htmlFor="historianType" className={styles.label}>Historian Type</label>
                <input
                  type="text"
                  id="historianType"
                  className={`${styles.input} ${styles.historianTypeInput}`}
                  placeholder="e.g. Archaeologist"
                />
              </div>
            </div>
          )}

          {/* Description Row */}
<div className={styles.formRow}>
  <div className={styles.formColFull}>
    <label htmlFor="description" className={styles.label}>Item Description</label>
    <textarea
      id="description"
      className={`${styles.textarea} ${styles.descriptionTextarea}`}
      placeholder="Write a short description..."
    ></textarea>
  </div>
</div>


          {/* Submit Button */}
          <button type="submit" className={styles.submitButton}>Add Item</button>
        </main>
      </div>
    </div>
  );
}
