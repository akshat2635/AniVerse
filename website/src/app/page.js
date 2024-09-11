'use client';
import Carousel from "@/components/Carousel";
import { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";

export default function Home() {
  const {user}=useAuth();
  const [token, setToken] = useState(null);
  const [userRatings, setUserRatings] = useState(null);
  const [userRecom, setUserRecom] = useState(null);
  const [trending, setTrending] = useState(null);
  const [trendingAnime, setTrendingAnime] = useState(null);
  const [userFav, setUserFav] = useState(null);
  const [userFavName, setUserFavName] = useState(null);
  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    setToken(storedToken);
    console.log(storedToken);
  }, []);

  useEffect(() => {
    // Fetch rating only when token is set
    if (token) {
      const fetchRating = async () => {
        try {
          const response = await fetch(`http://localhost:6969/rating`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });

          const data = await response.json();
          // console.log(data[0].animeId);
          let ratingdict={};

          if (response.ok) {
            console.log(data);
            let i=0;
            let favAnimeId = null;
            let favRating = -1;
            data.forEach((rating) => {
              ratingdict[Number(rating.animeId)] = rating.rating;
              if (i < 5) {
                if (!favAnimeId || favRating < rating.rating) {
                  favAnimeId = Number(rating.animeId);
                  favRating = rating.rating;
                }
              }
              i += 1;
            });
            setUserRatings(ratingdict);
            setUserFav(favAnimeId);
            setUserFavRat(favRating);
          } else {
            console.log(data.message);
          }
        } catch (error) {
          console.error('Error fetching rating:', error);
        }
      };

      fetchRating();
    }
  }, [token]);

  useEffect(()=>{
    const fetchRecom=async ()=>{
      try {
        const response = await fetch(`https://aniverse-3tlm.onrender.com/submit-ratings`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({"ratings":userRatings})
          
        });
        if (!response.ok) {
          throw new Error('Error in fetching user recommendations');
        }
        const data = await response.json();
        console.log(data);
        setUserRecom(data.recommended);
      } catch (error) {
        console.error("Error while fetching recommendation",error.message)
      }
    }
    if(userRatings) fetchRecom();
  },[userRatings])

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await fetch(`http://localhost:6969/rating/trending`, {
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

  useEffect(()=>{
    const fetchname=async ()=>{
      try {
        const response = await fetch(`https://aniverse-3tlm.onrender.com/get-info/${userFav}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        if (!response.ok) {
          throw new Error('Error in fetching fav name');
        }
        const data = await response.json();
        setUserFavName(data.data[0].title);
        // setUserRecom(data.recommended);
      } catch (error) {
        console.error("Error while fetching name",error.message)
      }
    }
    if(userFav) fetchname();
  },[userFav])

  return (
    <main >
      {/* <div className="w-1/4 h-1/2 my-3">
        <UseReview/>
      </div> */}
      <div className="flex flex-col justify-center items-center">
        <h1 className="mt-3 font-semibold text-xl">  Welcome To <span className="font-bold font-serif">AniVerse</span></h1>
        <h4 className=" font-semibold">Get Recommendations and details of different Anime</h4>
      </div>
      {userRecom && userRecom.length>0 && user && 
      <div className="p-5 my-4 flex flex-col justify-center items-center">
        <h1 className=" p-3 my-3 font-bold text-xl">Anime you may Like</h1>
        <div className="flex items-center justify-center w-full">
          <Carousel category="user" id={38000} n={30}  userRecom={userRecom}/>
        </div>
      </div>}

      {trendingAnime && trendingAnime.length>10 &&
      <div className="p-5 my-4 flex flex-col justify-center items-center">
        <h1 className=" p-3 my-3 font-bold text-xl">Trending Anime</h1>
        <div className="flex items-center justify-center w-full">
          <Carousel category="user" id={38000} n={30}  userRecom={trendingAnime}/>
        </div>
      </div>}

      {user && userFav &&
        <div className="p-5 my-4 flex flex-col justify-center items-center">
          <h1 className=" p-3 my-3 font-bold text-xl">Since you liked {userFavName}</h1>
          <div className="flex items-center justify-center w-full">
            <Carousel category="id" id={userFav} filter={1} n={30}/>
          </div>
        </div>
      }
      <div className="p-5 my-4 flex flex-col justify-center items-center">
        <h1 className=" p-3 my-3 font-bold text-xl">Most Popular Anime</h1>
        <div className="flex items-center justify-center w-full">
          <Carousel category="popular" id={38000} n={30}/>
        </div>
      </div>
      <div className="p-4 my-4 flex flex-col justify-center items-center">
        <h1 className=" p-3 my-3 font-bold text-xl">Top Rated Anime</h1>
        <div className="flex items-center justify-center w-full">
          <Carousel category="top" id={38000} n={30}/>
        </div>
      </div>
      <div className="p-5 my-4 flex flex-col justify-center items-center">
        <h1 className=" p-3 my-3 font-bold text-xl">Most Viewed Anime</h1>
        <div className="flex items-center justify-center w-full">
          <Carousel category="viewed" id={38000} n={30}/>
        </div>
      </div>
      <div className="p-5 my-4 flex flex-col justify-center items-center">
        <h1 className=" p-3 my-3 font-bold text-xl">Most Favourited Anime</h1>
        <div className="flex items-center justify-center w-full">
          <Carousel category="favorite" id={38000} n={30}/>
        </div>
      </div>
    </main>
  );
}
