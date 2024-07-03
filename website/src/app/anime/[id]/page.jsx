// import React from 'react'
"use client";
import { useState,useEffect } from "react"
import Carousel from "@/components/Carousel";
import { useParams } from "next/navigation";
export default function anime() {
  const [hoverIndex, setHoverIndex] = useState(-1); // State to track hovered index
  const [userrating, setuserrating] = useState(null);
  const handleStarHover = (index) => {
    setHoverIndex(index); // Set the hovered index
  };

  const handleStarLeave = () => {
    setHoverIndex(-1); // Reset hover state on mouse leave
  };
  const handleStarClick =(ind) =>{
    console.log(ind)
    setuserrating(ind)  
  }
  const [animeInfo, setAnimeInfo] = useState(null);
  const id=useParams().id
  useEffect(() => {
    let isMounted = true;
      const fetchAnimeInfo = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:5000/get-info/${id}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          if (isMounted) {
            // console.log(1)
            setAnimeInfo(data.data[0]);
          }
          
        } catch (error) {
          console.error('Error fetching data:', error);
        }
        
      };
  
      fetchAnimeInfo();
      return () => {
        isMounted = false;
      };
    }, [id]);
  // console.log(animeInfo)
  // const user_rating=null;
  return (
    <div>
      {!animeInfo ? <></>:
      <>
      <div className="flex flex-col justify-center items-center p-3 m-2 ">
        <h1 className="text-2xl font-semibold">{animeInfo.title} ({Number(animeInfo.year)!==0?animeInfo.year:'unknown'})</h1>

          <p >Genres: {(animeInfo.genres+animeInfo.themes+(animeInfo.demographics=="unknown"?"":animeInfo.demographics)).split(" ").join(" , ").slice(0,-2)}</p>
        
        <div className="flex justify-center content-center my-3 ml-16">
          <img className="p-2 m-2 w-1/5" src={animeInfo.image_url} alt="img" />
          <div className="w-3/5 p-5 m-2">
            <p >{animeInfo.synopsis}</p>
            <br />
            
          </div>
          <div className="w-1/3 flex flex-col justify-around content-center">
            <div>
              {userrating? <p> Your Rating : {userrating} <span class="fa fa-star checked"></span></p>:<div> Rate this Anime 
                <br />
                <div className="stars">
                  {[...Array(10)].map((_, index) => (
                    <span
                      key={index}
                      className={`fa fa-star ${index <= hoverIndex ? 'checked' : ''} cursor-pointer`}
                      onMouseEnter={() => handleStarHover(index)}
                      onMouseLeave={handleStarLeave}
                      onClick={() => handleStarClick(index+1)}
                    ></span>
                  ))}
                </div>
                </div>}
            </div>
              <div className="h-2/5 mb-12 mt-7">
                <p><span className="font-bold"> Rating  </span>: {animeInfo.rating}</p>
                <p><span className="font-bold"> Aired </span>: {animeInfo.aired}</p>
                <p><span className="font-bold"> Type </span>: {animeInfo.type} </p>
                <p><span className="font-bold"> Source </span>: {animeInfo.source}</p>
                <p><span className="font-bold"> Total Episodes </span>: {Number(animeInfo.episodes)}</p>
                <p><span className="font-bold"> Duration </span>: {animeInfo.duration}</p>
                <p><span className="font-bold"> Studios </span>: {animeInfo.studios}</p>
              </div>
              <div>
              <p><span className="font-bold"> Popularity Rank </span> : {animeInfo.popularity}</p>
              <p><span className="font-bold"> Rank </span> : {Number(animeInfo.rank)}</p> 
              <p><span className="font-bold"> Favourited By </span> : {(animeInfo.favorites)}</p>
              <p><span className="font-bold"> Score </span> : {animeInfo.score}/10 (scored by: {animeInfo.scored_by})</p>
              </div>
          </div>  
        </div>
          {animeInfo.embed_url!=="unknown"?
          <div className="p-3 m-2 flex flex-col justify-center items-center">
            <h2 className="p-3 my-3 text-xl font-semibold">Trailer of {animeInfo.title}</h2>
            <iframe width="720" height="360"src={animeInfo.embed_url}></iframe>
          </div>
          :""}
        <div className="p-2 my-10 w-full flex flex-col justify-center items-center">
          <h2 className="p-3 my-3 text-xl font-semibold">Anime related to {animeInfo.title}</h2>
          <Carousel category="id" id={id} n={36} />
        </div>
      </div>
      </>
      }

    </div>
  )
}
