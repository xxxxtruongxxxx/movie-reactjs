import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./banner.css";

const IMG_API = "https://image.tmdb.org/t/p/original";

function Banner(props) {
  const [bannerMovies, setBannerMovies] = useState([]);

  useEffect(() => {
    fetch(props.props)
      .then((res) => res.json())
      .then((data) => {
        const results = data.results;
        const ramdomBanner =
          results[Math.floor(Math.random() * results.length - 1)]; //lấy ngẫu nhiên một bộ phim trong array

        setBannerMovies(ramdomBanner);
      });
  }, []);

  return (
    <>
      <div
        className="banner"
        style={{
          backgroundImage: `url('${IMG_API + bannerMovies.backdrop_path}')`,
          backgroundSize: "cover",
          height: "400px",
        }}
      >
        <div className="bannerDetail">
          <h1>{bannerMovies.original_name}</h1>
          <div className="bannerDetailBtn">
            <button>Play</button>
            <button>My List</button>
          </div>
          <p>{bannerMovies.overview}</p>
        </div>
      </div>
    </>
  );
}

export default Banner;
