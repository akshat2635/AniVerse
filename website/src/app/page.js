'use client';
// import Link from "next/link";
import Carousel from "@/components/Carousel";
import { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import UseReview from "@/components/UseReview";
// import { UserAuth } from "./context/AuthContext";

export default function Home() {
  // const { user } = UserAuth();
  const {user}=useAuth();
  const [token, setToken] = useState(null);
  const [userRatings, setUserRatings] = useState(null);
  const [userRecom, setUserRecom] = useState(null);
  // useEffect(() => {
  //   localStorage.removeItem('accessToken');
  // }, []);
  // empty token=null
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
            data.forEach((rating) => {
              ratingdict[Number(rating.animeId)] = rating.rating;
              // console.log(rating.animeI)
              });
            setUserRatings(ratingdict);
            // console.log(ratingdict);
            // setUserRatings(data);
          } else {
            console.log(data.message);
          }
          console.log(userRatings);
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
        const response = await fetch(`http://127.0.0.1:5000/submit-ratings`, {
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
        <h1 className=" p-3 my-3 font-bold text-xl">based on your history</h1>
        <div className="flex items-center justify-center w-full">
          <Carousel category="user" id={38000} n={30} userRecom={userRecom}/>
        </div>
      </div>}
      
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
