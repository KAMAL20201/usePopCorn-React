import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Movies from "./components/Movies";
import MoviesWatchedSummary from "./components/MoviesWatchedSummary";
import WatchedList from "./components/WatchedList";
import MovieDetails from "./components/MovieDetails";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [searchinput, setSearchinput] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  // const [watched, setWatched] = useState([]);

  //useState takes callbackk function and use the returned value by function
  //as initial state
  const [watched, setWatched] = useState(function (){
    const storedData=localStorage.getItem("watched");
    return JSON.parse(storedData);
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          "http://www.omdbapi.com/?&apikey=5ef51611&s=" + searchinput
        );
        if (!res.ok) {
          throw new Error("Something went wrong!");
        }
        const data = await res.json();
        console.log(data.Search);
        setMovies(data.Search);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    };
    if(searchinput!=='')
    fetchData();
  }, [searchinput]);

  useEffect(() => {
    localStorage.setItem('watched',JSON.stringify(watched));
  },[watched])
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  const inputHandler = (inputval) => {
    // console.log(inputval);
    setSearchinput(inputval);
  };
  const selectedMovieHandler = (id) => {
    console.log(id);
    setSelectedMovie(id);
  };

  const addToListHandler = (movie) => {
    setWatched([...watched, movie]);
    
  };

  const deleteHandler = (id) => {
    setWatched(watched.filter((movie)=>movie.imdbID!==id));
  }

  return (
    <>
      <NavBar movies={movies} onEnteringInput={inputHandler} />

      <main className="main">
        <Movies
          movies={movies}
          isLoading={isLoading}
          error={error}
          onSelectedMovie={selectedMovieHandler}
          
        />

        <div className="box">
          {selectedMovie ? (
            <MovieDetails
              id={selectedMovie}
              onBackClick={() => setSelectedMovie(null)}
              onAddToList={addToListHandler}
              watched={watched}
            />
          ) : (
            <>
              <MoviesWatchedSummary
                watched={watched}
                avgRuntime={avgRuntime}
              />

              <WatchedList watched={watched} onDelete={deleteHandler}/>
            </>
          )}
        </div>
      </main>
    </>
  );
}
