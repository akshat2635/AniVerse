import React from 'react';
import Link from 'next/link';
import { useHover } from '@uidotdev/usehooks';

const CarouselCard = ({aid, image, syn, title }) => {
  const [ref, hovering] = useHover();

  return (
    <div className='relative group flex flex-col'>
      <Link href={`/anime/${aid}`}>
      <div class="flip-card">
        <div class="flip-card-inner">
            <div class="flip-card-front">
                {/* <p class="title">FLIP CARD</p>
                <p>Hover Me</p> */}
                <img src={image} alt="Carousel Image" className="absolute inset-0 w-full h-full object-cover rounded-lg" />
            </div>
            <div class="flip-card-back">
              <h3 className="text-lg font-bold mb-2">Synopsis</h3>
              <p className='text-xs'>{syn.slice(0, 300)}...</p>
            </div>
        </div>
      </div>
        {/* <div ref={ref} className="w-full aspect-[3/4] transition-opacity duration-500 ease-in-out relative">
          {hovering ? (
            <div className='absolute inset-0'> 
              <div className='z-20 absolute inset-0 bg-black bg-opacity-40 text-white p-4 flex flex-col justify-center items-center'>
                <h3 className="text-lg font-bold mb-2">Synopsis</h3>
                <p className='text-xs'>{syn.slice(0, 300)}...</p>
              </div>
              <img src={image} alt="Carousel Image" className="absolute inset-0 w-full h-full object-cover rounded-lg opacity-30" />
            </div>
          ) : (
            <img src={image} alt="Carousel Image" className="absolute inset-0 w-full h-full object-cover rounded-lg" />
          )}
        </div> */}
      </Link>
      <h1 className="mt-2 text-center font-semibold">{title}</h1>
    </div>
  );
};

export default CarouselCard;