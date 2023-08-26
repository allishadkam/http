import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [Movies,setMovies]=useState([]);
  const [isloading,setisloading]=useState(false)
  const [error,seterror]=useState(null);

  async function handelrequest () {
    setisloading(true)
    seterror(null);
    try {
      const resualts=await fetch("https://swapi.dev/api/film")
      if (!resualts.ok){
        throw new Error("error . prossecc failed !")
      }
    const data=await resualts.json();

    

    const parsed=data.results.map(item=>{
      return {
        id:item.episode_id,
        title:item.title,
        openingText:item.opening_crawl,
        releaseDate:item.release_date
      };
      
    })
    setMovies(parsed)
    } catch (error) {
      seterror(error.message)
    }
    setisloading(false)

  }
  
  
  

  return (
    <React.Fragment>
      <section>
        <button onClick={handelrequest}>Fetch Movies</button>
      </section>
      <section>
        {isloading && <p>loading ...</p>}
      {!isloading &&<MoviesList movies={Movies}/>}
      {!isloading && error &&<p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;