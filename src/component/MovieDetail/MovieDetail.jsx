import React, { useState, useEffect, useCallback } from "react";
import "./movieDetail.css";

const API_KEY = "cd5677141d00cbc212198f55116af499";
const MovieDetail = (props) => {
  const movie_id = props.movieId;
  const imgMovie = "https://image.tmdb.org/t/p/original" + props.movieImg;
  // lấy dữ liệu về trailer của bộ phim
  const URL =
    `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=` + API_KEY;
  const [videoMovies, setVideoMovies] = useState([]);
  var videoLink;

  const fetchMovieData = useCallback(async () => {
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      // Lấy dữ liệu video trả về sau khi gọi API
      setVideoMovies(data.results);
      return data.results;
    } catch (error) {
      console.log(error.message);
    }
  }, [URL]);

  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData]);

  //Kiểm tra và lấy dữ liệu data phù hợp
  if (videoMovies.length !== 0) {
    videoMovies.forEach((e) => {
      if (
        e.site === "YouTube" &&
        (e.type === "Trailer" || e.type === "Teaser")
      ) {
        videoLink = "https://www.youtube.com/embed/" + e.key;
      }
      return;
    });
  }
  return (
    <div className="movieDetail">
      <div className="detailContent">
        <div className="detailTitle">
          <h2>{props.movieName}</h2>
        </div>
        <p>Release Date: {props.releaseDate}</p>
        <p>Vote: {props.vote}</p>
        <p>{props.details}</p>
      </div>

      <div className="detailVideo">
        {videoMovies.length === 0 ? (
          <img
            style={{ width: "100%", height: "200px" }}
            src={imgMovie}
            alt={props.movieName}
            className="detailImage"
          />
        ) : (
          <iframe
            title={props.movieName}
            width="100%"
            height="170"
            src={videoLink}
          />
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
