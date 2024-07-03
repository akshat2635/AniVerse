// components/Carousel.js
import React, { useState ,useEffect} from 'react';
import CarouselCard from './CarouselCard';

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
    const itemsPerPage = 6;
    // var prevIndex=0;
    const prevSlide = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex -itemsPerPage <0 ? Math.max(animeInfo.length - itemsPerPage, 0) : prevIndex - itemsPerPage
      );
    };
  
    const nextSlide = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex + itemsPerPage >= animeInfo.length ? 0 : prevIndex + itemsPerPage
    );
  };
  
  const getCurrentImages = () => {
      // console.log(currentIndex)
      if(!animeInfo){
        return null
      }
      const endIndex = currentIndex + itemsPerPage;
      if (endIndex > animeInfo.length) {
        return animeInfo.slice(currentIndex).concat(animeInfo.slice(0, endIndex - animeInfo.length));
      }
      return animeInfo.slice(currentIndex, endIndex);
    };
    
    return (
      <div className="relative w-full max-w-7xl mx-auto">
        {/* <h1 className='pb-3'>{category.toUpperCase()}</h1> */}
        <div className="flex  relative h-72 space-x-4 transition-transform duration-500 ease-in-out transform">
          {getCurrentImages()?getCurrentImages().map((temp,index) => (
            <div key={index} className="w-1/6 transition-opacity duration-500 ease-in-out ">
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
