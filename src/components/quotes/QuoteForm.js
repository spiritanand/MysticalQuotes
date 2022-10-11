import {
	Fragment,
	useRef,
} from 'react';

import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './QuoteForm.module.css';

const QuoteForm = (props) => {
	// const [isFormFocussed, setIsFormFocussed] = useState(false);
	
	const authorInputRef = useRef();
	const textInputRef = useRef();
	
	function submitFormHandler(event) {
		event.preventDefault();
		
		const enteredAuthor = authorInputRef.current.value;
		const enteredText = textInputRef.current.value;
		
		// optional: Could validate here
		
		props.onAddQuote({
			author: enteredAuthor,
			text  : enteredText
		});
	}
	
	// function finishedEnteringHandler() {
	// 	setIsFormFocussed(false);
	// }
	
	return (
		<Fragment>
			{/*<Prompt when = {isFormFocussed}*/}
			{/*		message = {(location) => "Are you sure you want" +*/}
			{/*			" to exit page? All you form's data will be lost."}></Prompt>*/}
			<Card>
				<form
					className = {classes.form}
					onSubmit = {submitFormHandler}
				>
					{props.isLoading && (
						<div className = {classes.loading}>
							<LoadingSpinner/>
						</div>
					)}
					
					<div className = {classes.control}>
						<label htmlFor = "author">Author</label>
						<input type = "text"
							   id = "author"
							   ref = {authorInputRef}
						/>
					</div>
					<div className = {classes.control}>
						<label htmlFor = "text">Text</label>
						<textarea id = "text"
								  rows = "5"
								  ref = {textInputRef}
						></textarea>
					</div>
					<div className = {classes.actions}>
						<button
							className = "btn"
						>Add Quote
						</button>
					</div>
				</form>
			</Card>
		</Fragment>
	);
};

export default QuoteForm;
