// Imports
import React from "react";
import styled from "styled-components";
import Movie from "./Movie";

// Component
const MoviesList = ({ movies }) => {

	// Return
	return(
		<Wrapper>
			{
				movies.map((movie) => {
					return <Movie key={ movie.id } { ...movie }/>
				})
			}
		</Wrapper>
	);

};

// Styled
const Wrapper = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0;
`;

// Export
export default MoviesList;