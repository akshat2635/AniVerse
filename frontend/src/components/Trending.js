import React from 'react'
import { useEffect, useState } from "react";
import Carousel from './Carousel';

export default function Trending() {
    const [trending, setTrending] = useState(null);
    const [trendingAnime, setTrendingAnime] = useState(null);
    useEffect(() => {
        const fetchTrending = async () => {
          try {
            const response = await fetch(`https://aniverse-backend-3gqz.onrender.com/rating/trending`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            if (!response.ok) {
              throw new Error('Error in fetching user trending');
            }
            const data = await response.json();
            
            // Extract animeIds from the data and create an array
            const animeIds = data.map(item => Number(item.animeId));
            setTrending(animeIds); 
          } catch (error) {
            console.error(error.message);
          }
        };
      
        fetchTrending();
      }, []);
    
    useEffect(()=>{
    const fetchtrendingAnime=async ()=>{
        try {
        const response = await fetch(`https://aniverse-3tlm.onrender.com/get-info`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({"id":trending})
            
        });
        if (!response.ok) {
            throw new Error('Error in fetching user recommendations');
        }
        const data = await response.json();
        console.log(data.data);
        setTrendingAnime(data.data);
        } catch (error) {
        console.error("Error while fetching recommendation",error.message)
        }
    }
    if(trending) fetchtrendingAnime();
    },[trending])
    if(trendingAnime && trendingAnime.length>10){
        return (
            <div className="p-5 my-4 flex flex-col justify-center items-center">
                <h1 className=" p-3 my-3 font-bold text-xl">Trending Anime</h1>
                <div className="flex items-center justify-center w-full">
                <Carousel category="user" userRecom={trendingAnime}/>
                </div>
            </div>
        )
    }else {
        return (<></>)
    }
}
