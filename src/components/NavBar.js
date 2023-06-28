import React, { useRef } from "react";
import searchimage from "../assets/search.png";
function NavBar({ movies, onEnteringInput }) {
  const myref = useRef();

  const inputHandler = () => {
    onEnteringInput(myref.current.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      inputHandler();
    }
  };

  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        ref={myref}
        onKeyPress={handleKeyPress}
      />
      <img
        src={searchimage}
        height="20px"
        alt="search"
        className="searchbtn"
        onClick={inputHandler}
      />
      <p className="num-results">
        Found <strong>x</strong> results
      </p>
    </nav>
  );
}
export default NavBar;
