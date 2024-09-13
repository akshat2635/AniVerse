import React from 'react'
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from "react";
import Carousel from './Carousel';

export default function UserRecom() {
    const {user}=useAuth();
    const [token, setToken] = useState(null);
    const [userRatings, setUserRatings] = useState(null);
    const [userRecom, setUserRecom] = useState(null);
    const [userFav, setUserFav] = useState(null);
    const [userFavName, setUserFavName] = useState(null);
    useEffect(() => {
        if(user){
            setToken(user.token);
            console.log(user.token);
        }
    }, [user]);
    useEffect(() => {
        // Fetch rating only when token is set
        if (token) {
            const fetchRating = async () => {
            try {
                const response = await fetch(`https://aniverse-backend-3gqz.onrender.com/rating`, {
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
                // console.log(data);
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
                // setUserFavRat(favRating);
                } else {
                // console.log(data.message);
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
            // console.log(data);
            setUserRecom(data.recommended);
            } catch (error) {
            console.error("Error while fetching recommendation",error.message)
            }
        }
        if(userRatings) fetchRecom();
    },[userRatings])

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

    if(user){
        return (
        <div>
        {userRecom && userRecom.length>0 && user && 
          <div className="p-5 my-4 flex flex-col justify-center items-center">
            <h1 className=" p-3 my-3 font-bold text-xl">Anime you may Like</h1>
            <div className="flex items-center justify-center w-full">
              <Carousel category="user" userRecom={userRecom}/>
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
        </div>
        )
    }else return (<></>)
}
