import React from 'react';
import "../styles/CarouselCard.css"

const CarouselCard = ({ aid, image, syn, title }) => {

  return (
    <div className='relative group overflow-hidden flex flex-col items-center transform hover:scale-110 transition-transform duration-200'>
      <a href={`/anime/${aid}`}>
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <img
                src={image}
                alt="Carousel"
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flip-card-back">
              <p className='text-xs'>{syn.slice(0, 350)}...</p>
            </div>
          </div>
        </div>
      </a>
      <h1 className="mt-2 text-center font-semibold w-11/12">{title}</h1>
    </div>
  );
};

export default CarouselCard;
