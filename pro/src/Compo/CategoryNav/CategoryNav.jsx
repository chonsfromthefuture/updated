import React, { useRef, useState, useEffect } from 'react';
import styles from './CategoryNav.module.css';

const categories = [
  'Furniture',
  'Figures',
  'Gadgets',
  'Toys',
  'Collectables',
  'Sofa',
  'Cabinets',
  'Chairs',
  'Paintings',
  'Jewelry'
];

export default function CategoryNav() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const scrollRef = useRef(null);

  // Initialize with first item aligned to the left
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={styles.navbarWrapper}>
      <nav className={styles.navbar}>
        <button
          className={`${styles.arrowButton} ${styles.leftArrow}`}
          onClick={() => scroll('left')}
          aria-label="Scroll Left"
        >
          ◀
        </button>
        <div className={styles.scrollContainer} ref={scrollRef}>
          <ul className={styles.list}>
            {categories.map((category) => (
              <li
                key={category}
                className={`${styles.listItem} ${
                  selectedCategory === category ? styles.selected : ''
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
        <button
          className={`${styles.arrowButton} ${styles.rightArrow}`}
          onClick={() => scroll('right')}
          aria-label="Scroll Right"
        >
          ▶
        </button>
      </nav>
    </div>
  );
}