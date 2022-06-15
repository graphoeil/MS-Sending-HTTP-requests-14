// Imports
import React from "react";
import styled from "styled-components";

// Component
const Movie = ({ id, title, openingText, releaseDate }) => {

	// Return
	return(
		<Wrapper>
			<h2>{ title }</h2>
			<h3>{ openingText }</h3>
			<p>{ releaseDate }</p>
		</Wrapper>
	);

};

// Styled
const Wrapper = styled.li`
	margin: 1rem;
	padding: 1rem;
	background-color: #230052;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
	border-radius: 12px;
	text-align: center;
	color: white;
	h2{
		font-size: 2rem;
		color: #f9ca24;
	}
	h3{
		color: #f6e58d;
		margin: 0;
		font-size: 1rem;
	}
`;

// Export
export default Movie;