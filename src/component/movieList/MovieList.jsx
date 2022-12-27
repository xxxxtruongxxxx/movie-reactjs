import React, { useState, useEffect } from "react";
import MovieDetail from "../MovieDetail/MovieDetail";
import "./movielist.css";

const IMG_URL = `https://image.tmdb.org/t/p/original`;

function MovieList(props) {
  const [movies, setMovies] = useState([]);
  const [movieData, setMovieData] = useState({});
  const [showDetail, setShowDetail] = useState(false);
  const [clickMovieId, setClickMovieId] = useState(null);

  useEffect(() => {
    fetch(props.props)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  }, []);

  return (
    <>
      <div className="movieSection">
        {props.ListName !== "Original" ? <h2>{props.ListName}</h2> : <></>}
        <div className="movieList">
          {movies.map((movie) => (
            <img
              key={movie.id}
              src={
                props.ListName !== "Original"
                  ? IMG_URL + (movie.backdrop_path || movie.poster_path)
                  : IMG_URL + movie.poster_path
              }
              alt={movie.name}
              className="imgItem"
              onClick={() => {
                //Lưu thông tin phim
                setMovieData({
                  movie_id: movie.id,
                  movie_name: movie.title || movie.name,
                  img: movie.backdrop_path || movie.poster_path,
                  releaseDate: movie.release_date || movie.first_air_date,
                  vote: movie.vote_average,
                  details: movie.overview || "No description available!",
                });
                // Khi đang xem thông tin của một bộ phim, nếu người dùng click vào ảnh một bộ phim
                // khác thì bạn sẽ hiển thị thông tin của bộ phim đó
                if (clickMovieId === movie.id) {
                  setShowDetail(!showDetail);
                } else {
                  setShowDetail(true);
                }
                setClickMovieId(movie.id);
              }}
            />
          ))}
        </div>
      </div>

      {/* Hiển thị thông tin cụ thể phim sau khi click */}
      {showDetail && (
        <MovieDetail
          movieId={movieData.movie_id}
          movieName={movieData.movie_name}
          movieImg={movieData.img}
          releaseDate={movieData.releaseDate}
          vote={movieData.vote}
          details={movieData.details}
        />
      )}
    </>
  );
}

export default MovieList;
