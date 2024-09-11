import React, { useState, useEffect, useRef } from 'react';
import CarouselCard from './CarouselCard';

const Carousel = ({ category, id, n, filter, userRecom }) => {
  let api = '';
  if (category === 'popular') {
    api = `https://aniverse-3tlm.onrender.com/popular?n=${n}`;
  } else if (category === 'id') {
    api = `https://aniverse-3tlm.onrender.com/recommend?id=${id}&n=${n}&filter=${filter?filter:0}`;
  } else if (category === 'top') {
    api = `https://aniverse-3tlm.onrender.com/top?n=${n}`;
  } else if (category === 'favorite') {
    api = `https://aniverse-3tlm.onrender.com/favorite?n=${n}`;
  } else if (category === 'viewed') {
    api = `https://aniverse-3tlm.onrender.com/viewed?n=${n}`;
  }

  const [animeInfo, setAnimeInfo] = useState(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    if (category === 'user' && userRecom) {
      setAnimeInfo(userRecom);
    } else if (category !== 'user') {
      const fetchAnimeInfo = async () => {
        try {
          const response = await fetch(api);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setAnimeInfo(data.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchAnimeInfo();
    }
  }, [api, category, userRecom]);

  const prevSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -carouselRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  };

  const nextSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: carouselRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  };

  if (!animeInfo) {
    return null;
  }

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      <div className="carousel flex relative space-x-1" ref={carouselRef}>
        {animeInfo.map((temp, index) => (
          <div key={index} className="carousel-item w-1/6 transition-opacity duration-500 ease-in-out">
            <CarouselCard aid={temp.anime_id} image={temp.image_url} syn={temp.synopsis} title={temp.title} />
          </div>
        ))}
      </div>
      <button
        className="bt absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2"
        onClick={prevSlide}
      >
        &#8592;
      </button>
      <button
        className="bt absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2"
        onClick={nextSlide}
      >
        &#8594;
      </button>
    </div>
  );
};

export default Carousel;
