// Imports
import React, { useState, useEffect, useCallback } from "react";
import MoviesList from "./components/MoviesList";
import './App.css';

// Component
const App = () => {

	// State
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(null);

	// Get data
	// We use useCallback for prevent infinite loop in useEffect
	// useCallback for not re-create function unnecessarily
	const fetchMovies = useCallback(async() => {
		setIsLoading(true);
		setIsError(null);
		try {
			const response = await fetch('https://swapi.dev/api/films/');
			// Check for error
			if (!response.ok){
				// This error will be catched by try/catch block ,-)
				throw new Error('Something went wrong...');
			}
			const data = await response.json();
			const transformedMovies = data.results.map((movieData) => {
				return {
					id:movieData.episode_id,
					title:movieData.title,
					openingText:movieData.opening_crawl,
					releaseDate:movieData.release_date
				};
			});
			setMovies(transformedMovies);
			setIsLoading(false);	
		} catch (error){
			setIsLoading(false);
			setIsError(error.message);
		}
		// No dependencies to declare to useCallback here
	},[]);

	// Load data on mount
	useEffect(() => {
		fetchMovies();
	},[fetchMovies]);

	// Managing content
	// Another approach than multiples returns in MoviesList
	let content = <p>Found no movies...</p>;
	if (movies.length > 0){
		content = <MoviesList movies={ movies }/>;
	}
	if (isError){
		content = <p>{ isError }</p>;
	}
	if (isLoading){
		content = <p>Loading...</p>;
	}

	// Return
	return(
		<React.Fragment>
			<section>
				<button onClick={ fetchMovies }>
					Fetch movie
				</button>
			</section>
			<section>
				{ content }
			</section>
		</React.Fragment>
	);

};

// Export
export default App;