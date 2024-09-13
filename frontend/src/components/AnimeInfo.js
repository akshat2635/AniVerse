import RatingForm from "./RatingForm";

const AnimeInfo = ({ animeInfo, animeId, token, ratDisplay, setRatDisplay }) => {
  const all = (
    (animeInfo.genres === "unknown" ? "" : animeInfo.genres) +
    (animeInfo.themes === "unknown" ? "" : animeInfo.themes) +
    (animeInfo.demographics === "unknown" ? "" : animeInfo.demographics)
  )
    .split(" ")
    .filter((x) => x.length > 0);

  return (
    <div className="flex flex-col justify-center items-center p-3 m-2">
      <h1 className="text-2xl font-semibold text-center">
        {animeInfo.title}
        {Number(animeInfo.year) !== 0 && <span> ({Number(animeInfo.year)})</span>}
      </h1>
      <p className="text-center">
        Genres:{" "}
        {all.map((gen) => (
          <a href={`/tags/${gen}`} key={gen} className="hover:bg-slate-700 px-1">
            {gen}
          </a>
        ))}
      </p>

      <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start content-center my-3 w-full lg:w-auto">
        {/* Image Section */}
        <img
          className="p-2 m-2 lg:ml-16 w-full sm:w-1/2 lg:w-1/5"
          src={animeInfo.image_url}
          alt="Anime"
        />

        {/* Synopsis Section */}
        <div className="w-full lg:w-3/5 p-5 m-2">
          <p>{animeInfo.synopsis}</p>
        </div>

        {/* Rating and Info Section */}
        <div className="w-full lg:w-1/3 flex flex-col justify-around items-center lg:items-start content-center mt-4 lg:mt-0">
          <RatingForm
            animeId={animeId}
            token={token}
            ratDisplay={ratDisplay}
            setRatDisplay={setRatDisplay}
          />
          <div className="mt-7">
            <p>
              <span className="font-bold">Rating</span>: {animeInfo.rating}
            </p>
            <p>
              <span className="font-bold">Aired</span>: {animeInfo.aired}
            </p>
            <p>
              <span className="font-bold">Type</span>: {animeInfo.type}
            </p>
            <p>
              <span className="font-bold">Source</span>: {animeInfo.source}
            </p>
            <p>
              <span className="font-bold">Total Episodes</span>: {Number(animeInfo.episodes)}
            </p>
            <p>
              <span className="font-bold">Duration</span>: {animeInfo.duration}
            </p>
            <p>
              <span className="font-bold">Studios</span>: {animeInfo.studios}
            </p>
          </div>
          <div className="mt-7">
            <p>
              <span className="font-bold">Popularity Rank</span>: {animeInfo.popularity}
            </p>
            <p>
              <span className="font-bold">Rank</span>: {Number(animeInfo.rank)}
            </p>
            <p>
              <span className="font-bold">Favourited By</span>: {animeInfo.favorites}
            </p>
            <p>
              <span className="font-bold">Score</span>: {animeInfo.score}/10 (scored by:{" "}
              {animeInfo.scored_by})
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeInfo;
