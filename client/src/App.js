import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import {  Route, Switch  } from 'react-router-dom';
 
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie'

export default function App () {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5001/api/movies') // Study this endpoint with Postman
        .then(response => {
          // Study this response with a breakpoint or log statements
          // and set the response data as the 'movieList' slice of state
          console.log(response)
          setMovieList(response.data)
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);

  const addToSavedList = id => {
    // This is stretch. Prevent the same movie from being "saved" more than once
    if  (!saved.find(item => item.id === Number(id))) {
      const temp = saved;
      temp.push(movieList[id]);
      temp.sort((a,b) => a.id - b.id);
      setSaved([...temp]);
    }
  };

  return (
    <Fragment>
       <SavedList list={saved} />
      <Switch>
        <Route path='/movies/:id'> 
          <Movie movies={movieList} save={addToSavedList}  />
        </Route>
        <Route path='/'>
          <MovieList  movies={movieList} />
        </Route>
      </Switch>
    </Fragment>
  );
}
