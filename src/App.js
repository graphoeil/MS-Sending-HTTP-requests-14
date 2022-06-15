// Imports
import React, { useState } from "react";
import MoviesList from "./components/MoviesList";
import './App.css';

// Component
const App = () => {

	// State
	const [movies, setMovies] = useState([]);

	// Get data
	const fetchMovies = async() => {
		const response = await fetch('https://swapi.dev/api/films/');
		const data = await response.json();
		const transformedMovies = data.results.map((movieData) => {
			return {
				id:movieData.episode_id,
				title:movieData.title,
				openingText:movieData.opening_crawl,
				releaseDate:movieData.relase_date
			};
		});
		setMovies(transformedMovies);
	};

	// Return
	return(
		<React.Fragment>
			<section>
				<button onClick={ fetchMovies }>
					Fetch movie
				</button>
			</section>
			<section>
				<MoviesList movies={ movies }/>
			</section>
		</React.Fragment>
	);

};

// Export
export default App;