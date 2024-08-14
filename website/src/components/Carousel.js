// components/Carousel.js
import React, { useState ,useEffect,useRef} from 'react';
import CarouselCard from './CarouselCard';
import anime from '@/app/anime/[id]/page';

const Carousel = ({category,id,n}) => {
  let api=""
  if (category=='popular'){
    api="http://127.0.0.1:5000/popular?"+`n=${n}`
  }else if(category=="id"){
    api=`http://127.0.0.1:5000/recommend?id=${id}&n=${n}&filter=0`
  }else if(category=="top"){
    api=`http://127.0.0.1:5000/top?n=${n}`
  }else if(category=="favorite"){
    api=`http://127.0.0.1:5000/favorite?n=${n}`
  }else if(category=="viewed"){
    api=`http://127.0.0.1:5000/viewed?n=${n}`
  }
  const [animeInfo, setAnimeInfo] = useState(null);
  // const id=params.id
  useEffect(() => {
    let isMounted = true;
      const fetchAnimeInfo = async () => {
        try {
          const response = await fetch(api);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          if (isMounted) {
            // console.log(1)
            setAnimeInfo(data.data);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
        
      };
  
      fetchAnimeInfo();
      return () => {
        isMounted = false;
      };
    }, []);

    
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef(null);
    const itemsPerPage = 6;
    // var prevIndex=0;
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
  
  const getCurrentImages = () => {
      // console.log(currentIndex)
      if(!animeInfo){
        return null
      }
      return animeInfo
      const endIndex = currentIndex + itemsPerPage;
      if (endIndex > animeInfo.length) {
        return animeInfo.slice(currentIndex).concat(animeInfo.slice(0, endIndex - animeInfo.length));
      }
      return animeInfo.slice(currentIndex, endIndex);
    };
    
    return (
      <div className="relative w-full max-w-7xl mx-auto">
        {/* <h1 className='pb-3'>{category.toUpperCase()}</h1> */}
        <div className="carousel flex  relative space-x-1" ref={carouselRef}>
          {animeInfo?animeInfo.map((temp,index) => (
            <div key={index} className="carousel-item w-1/6 transition-opacity duration-500 ease-in-out ">
              <CarouselCard aid={temp.anime_id} image={temp.image_url} syn={temp.synopsis} title={temp.title}/>
            </div>
          )):""}
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
