import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import AddMovie from './components/AddMovie';

function App() {
  const [Movies,setMovies]=useState([]);
  const [isloading,setisloading]=useState(false)
  const [error,seterror]=useState(null);
  

  const handelrequest = useCallback(async()=>{
    setisloading(true)
    seterror(null);
    try {
      const resualts=await fetch("https://test-posting-movies-default-rtdb.firebaseio.com/movies.json")
      if (!resualts.ok){
        throw new Error("error . prossecc failed !")
      }
    const data=await resualts.json();

    const movielist=[];
    for(const key in data){
      movielist.push({
        id:key,
        title:data[key].title,
        openingText:data[key].openingText,
        releaseDate:data[key].releaseDate,
      })
    }
    
    setMovies(movielist)
    } catch (error) {
      seterror(error.message)
    }
    setisloading(false)

  },[]) 
  
  useEffect(()=>{handelrequest()},[ handelrequest])
  
  async function addmoviehandler (Movie){
    const response=await fetch("https://test-posting-movies-default-rtdb.firebaseio.com/movies.json",{
      method:"POST",
      body: JSON.stringify(Movie),
      headers:{
        "Content-Type":"Aplication/json"
      }
    })
    const data=await response.json();
    console.log(data)
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addmoviehandler}/>
      </section>
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