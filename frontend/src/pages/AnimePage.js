import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Modal from "../components/Modal";
import Carousel from "../components/Carousel";
// import RatingForm from "../components/RatingForm";   
import AnimeInfo from "../components/AnimeInfo";
import ReviewCard from "../components/ReviewCard";
import Spinner from "../components/Spinner";
// import TrailerSection from "./components/TrailerSection";

const AnimePage = () => {
  const { user} = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [token, setToken] = useState(null);
  const [animeInfo, setAnimeInfo] = useState(null);
  const [ratDisplay, setRatDisplay] = useState(false);
  const [loading, setloading] = useState(true);
  // const [Username, setUsername] = useState(null);
  const { id } = useParams();
  const [latestReviews, setLatestReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    setToken(storedToken);
    setloading(false);
  }, []); // Empty dependency array ensures this runs once on mount




  useEffect(() => {
    let isMounted = true;

    const fetchReviews = async () => {
      try {
        const response = await fetch(`https://aniverse-backend-3gqz.onrender.com/rating/anime/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        if (isMounted) {
          // Take the first 5 reviews
          const filteredData = data.filter(item => item.review !== undefined);
          const latestReviews = filteredData.slice(0, 4);
          setLatestReviews(latestReviews);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchReviews();

    return () => {
      isMounted = false; // Cleanup function to prevent memory leaks
    };
  }, [id]);

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
  }, [id]); // id is already included here
  if(loading) return (<></>)
  if (!user) {
    return (
      <Modal
        showModal={isModalOpen}
        head={"User Not Logged IN"}
        msg="Please Login To Continue"
        link_msg="Login"
        onClose={() => { setIsModalOpen(false); navigate('/login'); }}
      />
    );
  }

  return (
    <div className="mt-20"> 
      {animeInfo ? (
        <>
          <AnimeInfo animeInfo={animeInfo} 
            animeId={id}
            token={token}
            ratDisplay={ratDisplay}
            setRatDisplay={setRatDisplay}
          />
          <div className="flex p-6 justify-around">
          {animeInfo.embed_url !== "unknown" ?
           ( <div className="w-2/3 p-4 m-2 mt-0 flex flex-col items-center flex-shrink-0">
              <h2 className="p-3 mb-3 text-xl font-semibold">Trailer of {animeInfo.title}</h2>
              <iframe 
                className="max-w-full w-[42rem] h-96"
                src={animeInfo.embed_url} 
                title={`Trailer of ${animeInfo.title}`} 
                allow="accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                ></iframe>
            </div>):(<div className="w-1/2"></div>)
          }
          {latestReviews.length>0 &&
            <div className="w-1/4 flex flex-col gap-4 p-4 mr-[1.5%]">
            <h3 className="font-semibold">Latest Reviews for {animeInfo.title.split(':')[0]}</h3>
            {latestReviews.map((review) => (
                <ReviewCard
                  key={review._id}
                  username={review.username}
                  date={new Date(review.reviewedAt).toLocaleDateString()}
                  review={review.review}
                  stars={review.rating}
                />
              ))}
            </div>
        }
        </div>
          <div className="p-2 my-10 w-full flex flex-col justify-center items-center">
            <h2 className="p-3 my-3 text-xl font-semibold">Anime related to {animeInfo.title}</h2>
            <Carousel category="id" id={id} n={36} />
          </div>
        </>
      ) : (
        <div className="flex justify-center my-10 items-center">
          <Spinner/>
        </div>
      )}
    </div>
  );
};

export default AnimePage;
