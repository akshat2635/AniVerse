import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import CarouselCard from '../components/CarouselCard';
import Spinner from '../components/Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function TagPage() {
    const [animeData, setAnimeData] = useState([]);
    const [visibleData, setVisibleData] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const { tag } = useParams();
    const itemsPerPage = 16;
    let currentPage = useRef(1); // Use a ref to track the current page

    useEffect(() => {
        const fetchAnimeInfo = async () => {
            try {
                const response = await fetch(`https://aniverse-3tlm.onrender.com/tag/${tag}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAnimeData(data.data);
                setVisibleData(data.data.slice(0, itemsPerPage)); // Load initial data
                setHasMore(data.data.length > itemsPerPage); // Check if there's more data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchAnimeInfo();
    }, [tag]);

    const fetchMoreData = () => {
        // Simulate a delay
        setTimeout(() => {
            const totalItems = animeData.length;
            const startIndex = currentPage.current * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;

            // Check if we have reached the end of the data
            const nextPageData = animeData.slice(startIndex, Math.min(endIndex, totalItems));

            setVisibleData(prev => [...prev, ...nextPageData]);

            currentPage.current += 1;

            // If we've fetched all items, stop loading more
            if (endIndex >= totalItems) {
                setHasMore(false);
            }
        }, 1500); // 1.5-second delay
    };

    return (
        <div className="flex justify-center items-center">
            <div className="grid-container max-w-7xl mx-auto px-4">
                <h1 className="text-2xl font-bold text-center mt-20 mb-5">{tag} Anime</h1>
                <InfiniteScroll
                    dataLength={visibleData.length} // Length of the currently visible data
                    next={fetchMoreData} // Function to fetch more data
                    hasMore={hasMore} // Flag to indicate if there is more data
                    loader={<div className="flex justify-center my-10 "><Spinner/></div>} // Spinner component while loading new data
                    endMessage={
                        <p className="text-center my-4">Yay! You have seen all {tag} anime</p>
                    }
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
                        {visibleData && visibleData.map((anime) => (
                            <CarouselCard
                                key={anime.anime_id}
                                aid={anime.anime_id}
                                image={anime.image_url}
                                syn={anime.synopsis}
                                title={anime.title}
                            />
                        ))}
                    </div>
                </InfiniteScroll>
            </div>
        </div>
    );
}
