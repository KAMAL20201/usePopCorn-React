import React from "react";

function Movies({ movies, isLoading, error,onSelectedMovie }) {

  console.log(movies);
  return (
    <div className="box">
      {isLoading ? (
        <h1 className="loading">Loading...</h1>
      ) : error ? (
        <h1 className="error">{error}</h1>
      ) : movies?.length > 0 ? (
        <ul className="list list-movies">
          {movies?.map((movie) => (
            <li key={movie.imdbID} onClick={()=>onSelectedMovie(movie.imdbID)}>
              <img src={movie.Poster} alt={`${movie.Title.split(" ")[0]}`} />
              <h3>{movie.Title}</h3>
              <div>
                <p>
                  <span>🗓</span>
                  <span>{movie.Year}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <h1 className="no-movies"> No Movies Found</h1>
      )}
    </div>
  );
}

export default Movies;
