import React from 'react';
import Link from 'next/link';
import { useHover } from '@uidotdev/usehooks';

const CarouselCard = ({aid, image, syn, title }) => {
  const [ref, hovering] = useHover();

  return (
    <div className='relative group flex flex-col'>
      <Link href={`/anime/${aid}`}>
      <div className="flip-card">
        <div className="flip-card-inner">
            <div className="flip-card-front">
                <img src={image} alt="Carousel Image" className="absolute inset-0 w-full h-full object-cover rounded-lg" />
            </div>
            <div className="flip-card-back">
              <h3 className="text-lg font-bold mb-2">Synopsis</h3>
              <p className='text-xs'>{syn.slice(0, 300)}...</p>
            </div>
        </div>
      </div>
      </Link>
      <h1 className="mt-2 text-center font-semibold">{title}</h1>
    </div>
  );
};

export default CarouselCard;