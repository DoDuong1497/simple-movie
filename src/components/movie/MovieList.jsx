import React from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import useSWR from "swr";
import { fetcher, tmdpApi } from "../../config";
import MovieCard, { MovieCardSkeleton } from "./MovieCard";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import { v4 } from "uuid";

// https://api.themoviedb.org/3/movie/now_playing?api_key=cf0bbb273d3479fb49e46923cc467ef9&language=en-US&page=1

const MovieList = ({ type }) => {
  const { data, error } = useSWR(tmdpApi.getMovieList(type), fetcher);
  const isLoading = !data && !error;
  const movies = data?.results || [];

  return (
    <div className="movie-list">
      {isLoading && (
        <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
          {new Array(4).fill().map((item) => (
            <SwiperSlide key={v4()}>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {!isLoading && (
        <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
          {movies.length > 0 &&
            movies.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  );
};

MovieList.propTypes = {
  type: PropTypes.string.isRequired,
};

const FallbackComponent = () => {
  return (
    <p className="bg-red-50 text-red-400">
      Something went wrong with this component
    </p>
  );
};

export default withErrorBoundary(MovieList, {
  FallbackComponent,
});
