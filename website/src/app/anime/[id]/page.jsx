"use client"
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import Modal from "@/components/Modal";
import Carousel from "@/components/Carousel";

export default function Anime() {
  const { user, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [userStar, setUserStar] = useState(null);
  const [userReview, setUserReview] = useState(null);
  const [ratDisplay, setRatDisplay] = useState(false);
  const [animeInfo, setAnimeInfo] = useState(null);
  const id = useParams().id;

  // Handle token fetch
  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    setToken(storedToken);
    console.log(storedToken);
  }, []);

  // Fetch rating when token changes
  useEffect(() => {
    if (token) {
      const fetchRating = async () => {
        try {
          const response = await fetch(`https://aniverse-backend-3gqz.onrender.com/rating/user/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });

          const data = await response.json();
          console.log(data);
          if (response.ok) {
            setUserStar(data.rating);
            setUserReview(data.review);
            setRatDisplay(true);
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

  // Fetch anime info when id changes
  useEffect(() => {
    let isMounted = true;
    const fetchAnimeInfo = async () => {
      try {
        const response = await fetch(`https://aniverse-3tlm.onrender.com/get-info/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (isMounted) {
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

  // Handle form submission
  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    const data = {
      animeId: id,
      userRating: userStar,
      review: userReview
    };
    try {
      const response = await fetch('https://aniverse-backend-3gqz.onrender.com/rating', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error submitting rating');
      }

      const result = await response.json();
      console.log(result);
      setRatDisplay(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleStarHover = (index) => setHoverIndex(index);
  const handleStarLeave = () => setHoverIndex(-1);
  const handleStarClick = (ind) => setUserStar(ind);

  if (!user) {
    return (
      <Modal
        showModal={isModalOpen}
        head={"User Not Logged IN"}
        msg="Please Login To Continue"
        link_msg="Login"
        onClose={() => { setIsModalOpen(false); router.push('/login'); }}
      />
    );
  }

  return (
    <div>
      {!animeInfo ? <></> :
        <>
          <div className="flex flex-col justify-center items-center p-3 m-2 ">
            <h1 className="text-2xl font-semibold">
              {animeInfo.title} {Number(animeInfo.year) !== 0 ? <span>({Number(animeInfo.year)})</span> : ''}
            </h1>
            <p>
              Genres: {((animeInfo.genres === "unknown" ? "" : animeInfo.genres) +
                (animeInfo.themes === "unknown" ? "" : animeInfo.themes) +
                (animeInfo.demographics === "unknown" ? "" : animeInfo.demographics))
                .split(" ").join(" , ").slice(0, -2)}
            </p>
            <div className="flex justify-center content-center my-3 ml-16">
              <img className="p-2 m-2 w-1/5" src={animeInfo.image_url} alt="img" />
              <div className="w-3/5 p-5 m-2">
                <p>{animeInfo.synopsis}</p>
                <br />
              </div>
              <div className="w-1/3 flex flex-col justify-around content-center">
                <div>
                  {ratDisplay ? <div>
                    <span className="font-bold"> Your Rating </span>: {userStar}/10
                    <div className="stars">
                      {[...Array(10)].map((_, index) => (
                        <span
                          key={index}
                          className={`fa fa-star size-5 ${index < userStar ? 'checked' : ''} cursor-pointer`}
                        ></span>
                      ))}
                      <h3>Your Review</h3>
                      <p>{userReview}</p>
                    </div>
                    <button type="button" onClick={() => { setRatDisplay(false) }}
                      className="group relative mt-4 flex justify-center py-1 px-8 border border-transparent text-base font-medium rounded-md text-gray-900 bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Edit Review
                    </button>
                  </div> :
                    <form onSubmit={handleRatingSubmit}>
                      <span className="font-bold"> Rate This Anime </span>
                      <br />
                      <div className="stars">
                        <div className="inline">
                          {[...Array(10)].map((_, index) => (
                            <span
                              key={index}
                              className={`fa fa-star size-5 ${userStar ? index < userStar ? 'checked' : '' : index <= hoverIndex ? 'checked' : ''} cursor-pointer`}
                              onMouseEnter={() => handleStarHover(index)}
                              onMouseLeave={handleStarLeave}
                              onClick={() => handleStarClick(index + 1)}
                            ></span>
                          ))}
                        </div>
                        {userStar && <h5 className="inline">{userStar}/10</h5>}
                      </div>
                      <div>
                        <textarea name="review" className="w-auto h-full px-5 py-2 mt-3 bg-slate-600 text-white textarea-accent" id="review" onChange={(e) => setUserReview(e.target.value)} placeholder="Enter your review" />
                      </div>
                      <button type="submit"
                        className="group relative mt-4 flex justify-center py-1 px-8 border border-transparent text-base font-medium rounded-md text-gray-900 bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Submit review
                      </button>
                    </form>
                  }
                </div>
                <div className="h-2/5 mt-7">
                  <p><span className="font-bold"> Rating </span>: {animeInfo.rating}</p>
                  <p><span className="font-bold"> Aired </span>: {animeInfo.aired}</p>
                  <p><span className="font-bold"> Type </span>: {animeInfo.type}</p>
                  <p><span className="font-bold"> Source </span>: {animeInfo.source}</p>
                  <p><span className="font-bold"> Total Episodes </span>: {Number(animeInfo.episodes)}</p>
                  <p><span className="font-bold"> Duration </span>: {animeInfo.duration}</p>
                  <p><span className="font-bold"> Studios </span>: {animeInfo.studios}</p>
                </div>
                <div className="mt-7">
                  <p><span className="font-bold"> Popularity Rank </span>: {animeInfo.popularity}</p>
                  <p><span className="font-bold"> Rank </span>: {Number(animeInfo.rank)}</p>
                  <p><span className="font-bold"> Favourited By </span>: {animeInfo.favorites}</p>
                  <p><span className="font-bold"> Score </span>: {animeInfo.score}/10 (scored by: {animeInfo.scored_by})</p>
                </div>
              </div>
            </div>
            {animeInfo.embed_url !== "unknown" &&
              <div className="p-3 m-2 flex flex-col justify-center items-center">
                <h2 className="p-3 my-3 text-xl font-semibold">Trailer of {animeInfo.title}</h2>
                <iframe width="720" height="360" src={animeInfo.embed_url}></iframe>
              </div>
            }
            <div className="p-2 my-10 w-full flex flex-col justify-center items-center">
              <h2 className="p-3 my-3 text-xl font-semibold">Anime related to {animeInfo.title}</h2>
              <Carousel category="id" id={id} n={36} />
            </div>
          </div>
        </>
      }
    </div>
  );
}
