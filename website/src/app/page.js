'use client';
import Link from "next/link";
import Carousel from "@/components/Carousel";
import { UserAuth } from "./context/AuthContext";

export default function Home() {
  const { user } = UserAuth();
  return (
    <main >
      <div className="flex flex-col justify-center items-center">
        <h1 className="mt-3 font-semibold text-xl">  Welcome To <span className="font-bold font-serif">AniVerse</span></h1>
        <h4 className=" font-semibold">Get Recommendations and details of different Anime</h4>
      </div>

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
