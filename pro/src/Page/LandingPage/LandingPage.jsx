import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LandingPage.module.css";
import CardItem from "../../Compo/CardItem/CardItem";
import hero from '../../assets/clouds.jpg';
import Footer from "../../Compo/Footer/Footer";

export default function LandingPage() {
  const navigate = useNavigate();
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.showCard);
          } else {
            entry.target.classList.remove(styles.showCard);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      cardRefs.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

return (
  <>
    <main className={styles.landingPage}>
      <div className={styles.backgroundGradient}></div>
      <div className={styles.overlay}>
        <h1 className={`${styles.landingTitle} ${styles.fadeInUp}`}>Welcome to Vinque</h1>
        <p className={`${styles.landingSubtitle} ${styles.fadeInUp}`} style={{ animationDelay: '0.2s' }}>
          Purchase your past
        </p>
        <button
          onClick={handleLoginClick}
          className={`${styles.loginBtn} ${styles.fadeInUp}`}
          style={{ animationDelay: '0.4s' }}
        >
          Get Started
        </button>
      </div>

      <section className={styles.cardSection}>
        {[...Array(12)].map((_, idx) => (
          <div
            key={idx}
            className={styles.cardItem}
            ref={(el) => (cardRefs.current[idx] = el)}
            onClick={() => navigate("/cart")}   
            style={{ cursor: "pointer" }}             
          >
            <CardItem />
          </div>
        ))}
      </section>
    </main>

    <Footer />
  </>
);

}