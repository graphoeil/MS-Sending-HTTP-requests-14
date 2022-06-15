// Imports
import React, { useState } from "react";
import MoviesList from "./components/MoviesList";
import './App.css';

// Component
const App = () => {

	// State
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	// Get data
	const fetchMovies = async() => {
		setIsLoading(true);
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
		setIsLoading(false);
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
				{/* Another approach than multiples returns in MoviesList */}
				{ !isLoading && movies.length > 0 && <MoviesList movies={ movies }/> }
				{ !isLoading && movies.length === 0 && <p>Found no movies...</p> }
				{ isLoading && <p>Loading...</p> }
			</section>
		</React.Fragment>
	);

};

// Export
export default App;