import image1 from '../../assets/clouds.jpg';
import styles from './CardItem.module.css';

export default function CardItem() {
  const status1 = true;
  const status2 = true;

  let statusBadge = null;
  if (status1 === status2) {
    statusBadge = <span className={styles.status}>Verified</span>;
  }

  return (
    <div className={styles.card}>
      <img className={styles.image} src={image1} alt="Clouds scenic" />
      
      <h2 className={styles.title}>Item Title</h2>
      <p className={styles.des}>A rare item that is use in the 1990</p>

      <div className={styles.priceRow}>
        {statusBadge}
        <p className={styles.price}>
          Price: <span className={styles.money}>$120</span>
        </p>
      </div>
    </div>
  );
}
