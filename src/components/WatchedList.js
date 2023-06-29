import React from 'react'

function WatchedList({watched,onDelete}) {

  const deleteHandler = (id) => {
    onDelete(id);
  }
  return (
    <div>
      <ul className="list">
                {watched.map((movie) => (
                  <li key={movie.imdbID}>
                    <img src={movie.Poster} alt={`${movie.Title} poster`} />
                    <h3>{movie.Title}</h3>
                    <div>
                      <p>
                        <span>⭐️</span>
                        <span>{movie.imdbRating}</span>
                      </p>
                      <p>
                        <span>🌟</span>
                        <span>{movie.userRating}</span>
                      </p>
                      <p>
                        <span>⏳</span>
                        <span>{movie.runtime} </span>
                      </p>
                      <button className='btn-delete' onClick={()=>deleteHandler(movie.imdbID)}>X</button>
                    </div>
                  </li>
                ))}
              </ul>
    </div>
  )
}

export default WatchedList
