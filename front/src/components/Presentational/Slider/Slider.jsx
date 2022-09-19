import React, { useState } from 'react';
import {Carousel,CarouselItem,CarouselControl,CarouselIndicators, CarouselCaption} from 'reactstrap';
import styles from "./Slider.module.css";
const items = [
  {
    src: "https://res.cloudinary.com/pruebadatos/image/upload/v1663529452/B3_txvsnm.png"
  },
  {
    src: 'https://res.cloudinary.com/pruebadatos/image/upload/v1663529439/B2_z2gjnb.png'
  },
  {
    src:  'https://res.cloudinary.com/pruebadatos/image/upload/v1663529462/B4_fki9jv.png'
  },
  {
    src: 'https://res.cloudinary.com/pruebadatos/image/upload/v1663529393/B1_o9jm50.png',
  },
  {
    src: 'https://res.cloudinary.com/pruebadatos/image/upload/v1663529471/B5_z53lf4.png',
  }
];

const Slide = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  
  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <div>
          <img className={styles.img} src={item.src} alt={item.altText} />
        </div>
        <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
      </CarouselItem>
    );
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  );
}

export default Slide;