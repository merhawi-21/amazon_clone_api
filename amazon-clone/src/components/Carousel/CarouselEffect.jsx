

import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { img } from './img/Carousel'; // Ensure this is an array of image URLs
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from './Carousel.module.css'

function CarouselEffect() {
  return (
    <div className={classes.banner_slide}>
      <Carousel
        interval={3000} // 3-second interval
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {img.map((imageItem, index) => (
          <div className={classes.carousel_item} key={index}>
            <img src={imageItem} alt={`Carousel item ${index}`} />
            <div className={classes.gradient_overlay}></div> {/* Gradient overlay */}
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselEffect;
