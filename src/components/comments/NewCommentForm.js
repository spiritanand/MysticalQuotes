import {Form} from "react-router-dom";

import classes from './NewCommentForm.module.css';

const NewCommentForm = () => {
	return (
		<Form className = {classes.form}
			  method="post"
			  action=""
		>
			<div className = {classes.control}
			>
				<label htmlFor = "comment">Your Comment</label>
				<textarea id = "comment"
						  name = "comment"
						  rows = "5"
				></textarea>
			</div>
			<div className = {classes.actions}>
				<button className = "btn">Add Comment</button>
			</div>
		</Form>
	);
};

export default NewCommentForm;
