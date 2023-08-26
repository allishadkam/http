import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [Movies,setMovies]=useState([]);

  const handelrequest=()=>{
    console.log('func run')
    fetch("https://swapi.dev/api/films").then(resualts=>{
      return resualts.json()  
  }).then(data=>{

    const parsed=data.results.map(item=>{
      return {
        id:item.episode_id,
        title:item.title,
        openingText:item.opening_crawl,
        releaseDate:item.release_date
      };
      
    })
    setMovies(parsed)
  })
  
  };
  

  return (
    <React.Fragment>
      <section>
        <button onClick={handelrequest}>Fetch Movies</button>
      </section>
      <section>
      <MoviesList movies={Movies}/>
      </section>
    </React.Fragment>
  );
}

export default App;