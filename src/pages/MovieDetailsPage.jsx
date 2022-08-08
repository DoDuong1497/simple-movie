import React, { Fragment } from "react";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import { fetcher, tmdpApi } from "../config";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "../components/movie/MovieCard";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { data, error } = useSWR(tmdpApi.getMovieDetail(movieId), fetcher);
  if (!data) return null;
  const { backdrop_path, title, genres, overview } = data;

  return (
    <Fragment>
      <div className="w-full h-[600px] relative">
        <div className="overlay absolute inset-0 bg-black bg-opacity-70"></div>
        <div
          className="w-full h-full bg-cover bg-no-repeat bg-center"
          style={{
            backgroundImage: `url(${tmdpApi.imageOriginal(backdrop_path)})`,
          }}
        ></div>
      </div>
      <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
        <img
          src={tmdpApi.imageOriginal(backdrop_path)}
          alt=""
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <h1 className="text-center text-4xl font-bold text-white mb-10">
        {title}
      </h1>
      {genres.length > 0 && (
        <div className="flex items-center justify-center gap-x-5 mb-10">
          {genres.map((item) => (
            <span
              className="py-2 px-4 border-primary text-primary border rounded-full"
              key={item.id}
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
      <p className="text-center leading-relaxed max-w-[600px] mx-auto mb-10">
        {overview}
      </p>

      <MovieMeta type="credits"></MovieMeta>
      <MovieMeta type="videos"></MovieMeta>
      <MovieMeta type="similar"></MovieMeta>
    </Fragment>
  );
};

const MovieMeta = ({ type }) => {
  const { movieId } = useParams();
  const { data, error } = useSWR(tmdpApi.getMovieMeta(movieId, type), fetcher);
  if (!data) return null;

  if (type === "credits") {
    const { cast } = data;
    if (!cast || cast.length <= 0) return null;

    return (
      <div className="py-10">
        <h2 className="text-center text-3xl mb-10">Cast</h2>
        <div className="grid grid-cols-4 gap-5">
          {cast.slice(0, 4).map((item) => (
            <div className="cast-item" key={item.id}>
              <img
                src={tmdpApi.imageOriginal(item.profile_path)}
                className="w-full h-[350px] object-cover rounded-lg mb-3"
                alt=""
              />
              <h3 className="text-xl font-medium">{item.name}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    const { results } = data;
    if (!results || results.length <= 0) return null;

    if (type === "videos") {
      return (
        <div className="py-10">
          <div className="flex flex-col gap-10">
            {results.slice(0, 2).map((item) => (
              <div key={item.id}>
                <h3 className="mb-5 text-xl font-medium p-3 bg-secondary inline-block">
                  {item.name}
                </h3>
                <div className="w-full aspect-video">
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${item.key}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full object-fill"
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (type === "similar") {
      return (
        <div className="py-10">
          <h2 className="text-3xl font-medium mb-10">Similar Movie</h2>
          <div className="movie-list">
            <Swiper
              grabCursor={"true"}
              spaceBetween={40}
              slidesPerView={"auto"}
            >
              {results.length > 0 &&
                results.map((item) => (
                  <SwiperSlide key={item.id}>
                    <MovieCard item={item}></MovieCard>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      );
    }
  }
  return null;
};

// const MovieCredit = () => {
//   const { movieId } = useParams();
//   const { data, error } = useSWR(
//     tmdpApi.getMovieMeta(movieId, "credits"),
//     fetcher
//   );
//   if (!data) return null;
//   const { cast } = data;
//   if (!cast || cast.length <= 0) return null;

//   return (
//     <div className="py-10">
//       <h2 className="text-center text-3xl mb-10">Cast</h2>
//       <div className="grid grid-cols-4 gap-5">
//         {cast.slice(0, 4).map((item) => (
//           <div className="cast-item" key={item.id}>
//             <img
//               src={tmdpApi.imageOriginal(item.profile_path)}
//               className="w-full h-[350px] object-cover rounded-lg mb-3"
//               alt=""
//             />
//             <h3 className="text-xl font-medium">{item.name}</h3>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const MovieVideo = () => {
//   const { movieId } = useParams();
//   const { data, error } = useSWR(
//     tmdpApi.getMovieMeta(movieId, "videos"),
//     fetcher
//   );
//   if (!data) return null;
//   const { results } = data;
//   if (!results || results.length <= 0) return null;

//   return (
//     <div className="py-10">
//       <div className="flex flex-col gap-10">
//         {results.slice(0, 2).map((item) => (
//           <div key={item.id}>
//             <h3 className="mb-5 text-xl font-medium p-3 bg-secondary inline-block">
//               {item.name}
//             </h3>
//             <div className="w-full aspect-video">
//               <iframe
//                 width="560"
//                 height="315"
//                 src={`https://www.youtube.com/embed/${item.key}`}
//                 title="YouTube video player"
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//                 className="w-full h-full object-fill"
//               ></iframe>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const MovieSimilar = () => {
//   const { movieId } = useParams();
//   const { data, error } = useSWR(
//     tmdpApi.getMovieMeta(movieId, "similar"),
//     fetcher
//   );
//   if (!data) return null;
//   const { results } = data;
//   if (!results || results.length <= 0) return null;

//   return (
//     <div className="py-10">
//       <h2 className="text-3xl font-medium mb-10">Similar Movie</h2>
//       <div className="movie-list">
//         <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
//           {results.length > 0 &&
//             results.map((item) => (
//               <SwiperSlide key={item.id}>
//                 <MovieCard item={item}></MovieCard>
//               </SwiperSlide>
//             ))}
//         </Swiper>
//       </div>
//     </div>
//   );
// };

export default MovieDetailsPage;
