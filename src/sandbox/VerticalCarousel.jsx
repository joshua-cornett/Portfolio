// src\sandbox\VerticalCarousel.jsx

import React, { useState } from 'react';

const VerticalCarousel = ({ items, onItemClick }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevClick = () => {
    setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : items.length - 1));
  };

  const handleNextClick = () => {
    setActiveIndex((prevIndex) => (prevIndex < items.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <div className="vertical-carousel">
      <button onClick={handlePrevClick}>&uarr;</button> {/* Up arrow for previous */}
      <ul>
        {items.map((item, index) => (
          <button
            key={index}
            className={`carousel-item ${index === activeIndex ? 'active' : ''}`}
            onClick={() => onItemClick(item)}
          >
            {item.type}
          </button>
        ))}
      </ul>
      <button onClick={handleNextClick}>&darr;</button> {/* Down arrow for next */}
    </div>
  );
};

export default VerticalCarousel;
