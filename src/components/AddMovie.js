// Imports
import React, { useRef } from "react";
import styled from "styled-components";

// Component
const AddMovie = ({ addMovie }) => {

	// Ref, uncontrolled form
	const titleRef = useRef('');
	const openingTextRef = useRef('');
  	const releaseDateRef = useRef('');

	// Submit form
	const handleSubmit = (e) => {
		e.preventDefault();
		const movie = {
			title:titleRef.current.value,
			openingText:openingTextRef.current.value,
			releaseDate:releaseDateRef.current.value,
		};
		addMovie(movie);
		// Reset
		titleRef.current.value = '';
		openingTextRef.current.value = '';
		releaseDateRef.current.value = '';
	};

	// Return
	return(
		<Wrapper onSubmit={ handleSubmit }>
			<div className="control">
				<label htmlFor='title'>Title</label>
				<input type='text' id='title' ref={ titleRef } />
			</div>
			<div className="control">
				<label htmlFor='opening-text'>Opening Text</label>
				<textarea rows='5' id='opening-text' ref={ openingTextRef }></textarea>
			</div>
			<div className="control">
				<label htmlFor='date'>Release Date</label>
				<input type='text' id='date' ref={ releaseDateRef } />
			</div>
			<button>Add Movie</button>
		</Wrapper>
	);

};

// Styled
const Wrapper = styled.form`
	.control{
		margin: 1rem 0;
		label{
			display: block;
			font-weight: bold;
			margin-bottom: 0.5rem;
			text-align: left;
		}
		input, textarea{
			display: block;
			width: 100%;
			font: inherit;
			padding: 0.2rem;
			border-radius: 12px;
			border: 1px solid #ccc;
			&:focus{
				outline: none;
				border-color: #230052;
			}
		}
	}
`;

// Export
export default AddMovie;