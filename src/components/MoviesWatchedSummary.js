import React from 'react'

function MoviesWatchedSummary({watched, avgRuntime}) {
  return (
    <div>
      <div className="summary">
                <h2>Movies you watched</h2>
                <div>
                  <p>
                    <span>#️⃣</span>
                    <span>{watched.length} movies</span>
                  </p>
                 
                  <p>
                    <span>⏳</span>
                    <span>{avgRuntime} min</span>
                  </p>
                </div>
              </div>
    </div>
  )
}

export default MoviesWatchedSummary
