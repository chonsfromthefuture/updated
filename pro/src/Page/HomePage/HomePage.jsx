// frontend/src/pages/HomePage/HomePage.jsx

import { useEffect, useRef } from "react";
import Card from "../../Compo/CardItem/CardItem.jsx";
import Header from "../../Compo/Header/Header.jsx"; // Make sure path is correct
import Carousel from "../../Compo/Carousel/Carousel.jsx";
import styles from "./HomePage.module.css";
import Category from "../../Compo/CategoryNav/CategoryNav.jsx";

export default function HomePage() {
  const navRef = useRef(null);
  const categoryRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.showItem);
          } else {
            entry.target.classList.remove(styles.showItem);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (navRef.current) observer.observe(navRef.current);
    if (categoryRef.current) observer.observe(categoryRef.current);

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      if (navRef.current) observer.unobserve(navRef.current);
      if (categoryRef.current) observer.unobserve(categoryRef.current);
      cardRefs.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  return (
    <div className={styles.HomePage}>
      {/* Render Header without showSearchBar prop, it will default to true */}
      <Header /> 
      {/* OR you can explicitly write <Header showSearchBar={true} /> */}
      
      <Carousel />

      <nav ref={navRef} className={`${styles.Cat} ${styles.appearItem}`}>
        Category
      </nav>
      <div ref={categoryRef} className={styles.appearItem}>
        <Category />
      </div>

      <div className={styles.cardContainer}>
        {[...Array(12)].map((_, index) => (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            className={styles.appearItem}
          >
            <Card />
          </div>
        ))}
      </div>

      <h1>Hello, this is the homepage</h1>
    </div>
  
);
}