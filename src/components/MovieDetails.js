import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Rating from "./Rating";
function MovieDetails({ id, onBackClick, onAddToList, watched }) {
  const [movieDetails, setMoviesDetails] = useState(null);
  const [userRated, setUserRated] = useState(0);

  const isWatched = watched.map((movie) => movie.imdbID).includes(id);

  useEffect(
    function () {
      async function fetchData() {
        const res = await fetch(
          "http://www.omdbapi.com/?apikey=5ef51611&i=" + id
        );
        const data = await res.json();
        setMoviesDetails(data);
      }
      fetchData();
    },
    [id]
  );

  const userRatedHandler = (value) => {
    setUserRated(value);
  };
  const addListHandler = () => {
    const newobj = {
      Title: movieDetails?.Title,
      Poster: movieDetails?.Poster,
      imdbID: movieDetails?.imdbID,
      imdbRating: movieDetails?.Ratings[0]?.Value,
      runtime:
        movieDetails?.Runtime !== "N/A"
          ? movieDetails?.Runtime?.split(" ")[0]
          : 0,
      userRating: userRated,
    };
    onAddToList(newobj);
    onBackClick();
  };
  return (
    <Container>
      <Header>
        <button className="btn-back" onClick={onBackClick}>
          &larr;
        </button>
        <img
          height="100px"
          width="90px"
          src={movieDetails?.Poster}
          alt={movieDetails?.Title}
        />
        <Info>
          <h2>{movieDetails?.Title}</h2>
          <span>
            <emp>
              {movieDetails?.Released} . {movieDetails?.Runtime}
            </emp>
          </span>
          <span>{movieDetails?.Genre}</span>
          {movieDetails?.Ratings?.length > 0 ? (
            <span>★ {movieDetails?.Ratings[0]?.Value} IMDB Rating</span>
          ) : (
            <span> 0/10 IMDB Rating</span>
          )}
        </Info>
      </Header>
      {!isWatched ? (
        <>
          <Rating onGivingRating={userRatedHandler} />
          <button className="btn-add" onClick={addListHandler}>
            + Add To List
          </button>
        </>
      ) : (
        <p>You Rated this movie {userRated} ★</p>
      )}
      <p>{movieDetails?.Plot}</p>
    </Container>
  );
}

export default MovieDetails;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  img {
    margin: 30px 40px;
  }
  p {
    margin: 10px 40px;
    line-height: 2;
    font-size: 12px;
  }
`;
const Header = styled.div`
  display: flex;
  align-items: center;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin: 26px 10px;
  span {
    padding: 4px;
  }
  h2 {
    padding: 4px;
  }
`;
