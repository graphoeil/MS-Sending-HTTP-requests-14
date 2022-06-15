// Imports
import React, { useState, useEffect, useCallback } from "react";
import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import './App.css';

/* In the Firebase console, we create new project, 
then we create a realtime database (must indicate dev mode), 
we get the http adress in the final screen. */

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
			// Add connection to firebase
			// movies.json will create a movies node in firebase realtime database
			const response = await fetch('https://ms-sending-http-requests-14-default-rtdb.europe-west1.firebasedatabase.app/movies.json');
			// Check for error
			if (!response.ok){
				// This error will be catched by try/catch block ,-)
				throw new Error('Something went wrong...');
			}
			const data = await response.json();
			// With firebase we don't get and array, but multiples objects...
			const loadedMovies = [];
			for (const key in data){
				loadedMovies.push({
					id:key,
					title:data[key].title,
					openingText:data[key].openingText,
					releaseDate:data[key].releaseDate
				});
			};
			setMovies(loadedMovies);
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

	// Add movie, we can handle error of course with try/catch
	// Don't forget movies.json !!!! If not will generate a cors error !!!!
	const addMovie = async(movie) => {
		const response = await fetch('https://ms-sending-http-requests-14-default-rtdb.europe-west1.firebasedatabase.app/movies.json',{
			method:'POST',
			mode:'cors',
			body:JSON.stringify(movie),
			headers:{
				'Content-Type':'application/json'
			}
		});
		const data = await response.json();
		console.log(data);
	};

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
				<AddMovie addMovie={ addMovie }/>
			</section>
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