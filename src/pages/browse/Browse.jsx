import React from "react";
import Banner from "../../component/Banner/Banner";
import MovieList from "../../component/movieList/MovieList";
import Navbar from "../../component/navbar/Navbar";
import styles from "./browse.module.css";

const API_KEY = "cd5677141d00cbc212198f55116af499";
const API_URL = `https://api.themoviedb.org/3`;
//Lấy dữ liệu từ API
const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchSearch: `/search/movie?api_key=${API_KEY}&language=en-US`,
};
// hiển thị các danh mục phim , mỗi danh mục tương ứng với một API Endpoint:
function Browse() {
  return (
    <div className={styles.browse}>
      <Navbar />
      <Banner props={API_URL + requests.fetchNetflixOriginals} />

      <div className={styles.movieContainer}>
        <div>
          <MovieList
            props={API_URL + requests.fetchNetflixOriginals}
            ListName="Original"
          />
          <MovieList
            props={API_URL + requests.fetchTrending}
            ListName="Xu hướng"
          />
          <MovieList
            props={API_URL + requests.fetchTopRated}
            ListName="Xếp hạng cao"
          />
          <MovieList
            props={API_URL + requests.fetchActionMovies}
            ListName="Hành động"
          />
          <MovieList
            props={API_URL + requests.fetchComedyMovies}
            ListName="Hài"
          />
          <MovieList
            props={API_URL + requests.fetchHorrorMovies}
            ListName="Kinh dị"
          />
          <MovieList
            props={API_URL + requests.fetchRomanceMovies}
            ListName="Lãng mạn"
          />
          <MovieList
            props={API_URL + requests.fetchDocumentaries}
            ListName="Tài liệu"
          />
        </div>
      </div>
    </div>
  );
}

export default Browse;
