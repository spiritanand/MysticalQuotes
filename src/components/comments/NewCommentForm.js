import {
	useEffect,
	useState
} from 'react';
import useHttp from "../../hooks/use-http";
import {addComment} from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

import classes from './NewCommentForm.module.css';

const NewCommentForm = (props) => {
	const {
			  onAddComment,
			  quoteId
		  } = props;
	const [commentText, setCommentText] = useState("");
	
	const {
			  sendRequest,
			  status,
			  error
		  } = useHttp(addComment);
	
	const submitFormHandler = (event) => {
		event.preventDefault();
		
		// optional: Could validate here
		
		sendRequest({
			commentData: {text: commentText},
			quoteId
		});
		setCommentText("");
	};
	
	useEffect(() => {
		if (status === "completed" && !error)
			onAddComment();
	}, [
		onAddComment,
		status,
		error
	]);
	
	
	return (
		<form className = {classes.form}
			  onSubmit = {submitFormHandler}
		>
			{status === "pending" &&
				<div className = "centered">
					<LoadingSpinner></LoadingSpinner>
				</div>}
			<div className = {classes.control}
				 onSubmit = {submitFormHandler}
			>
				<label htmlFor = "comment">Your Comment</label>
				<textarea id = "comment"
						  rows = "5"
						  value = {commentText}
						  onChange = {(e) => setCommentText(e.target.value)}
				></textarea>
			</div>
			<div className = {classes.actions}>
				<button className = "btn">Add Comment</button>
			</div>
		</form>
	);
};

export default NewCommentForm;
