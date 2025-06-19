import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from './Carousel.module.css';

import cloudsImage from '../../assets/clouds.jpg';
import togetherWithUImage from '../../assets/TogetherWithU.jpg';
import witchNightImage from '../../assets/witch-night.jpg';

const FullscreenCarousel = () => {
  const images = [cloudsImage, togetherWithUImage, witchNightImage];

  return (
    <div className={styles.fullscreenCarousel}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true, dynamicBullets: false }}
        autoplay={{ delay: 5000 }}
        loop={true}
        slidesPerView={1}
        className={styles.mySwiper}
      >
        {images.map((src, index) => (
          <SwiperSlide key={`slide-${index}`}>
            <img src={src} alt={`Slide ${index + 1}`} className={styles.slideImage} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FullscreenCarousel;
