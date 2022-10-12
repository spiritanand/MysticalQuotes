import {
	useState
} from 'react';
import {
	redirect,
	useActionData,
	useLoaderData,
} from "react-router-dom";
import {
	addComment,
	getAllComments
} from "../../lib/api";

import classes from './Comments.module.css';
import CommentsList from "./CommentsList";
import NewCommentForm from './NewCommentForm';

const Comments = () => {
	const [isAddingComment, setIsAddingComment] = useState(false);
	const loadedComments = useLoaderData();
	const errorData = useActionData();
	
	const startAddCommentHandler = () => {
		setIsAddingComment(true);
	};
	
	let comments;
	
	if (!loadedComments || loadedComments.length === 0) {
		comments = <p className = "centered">No comments added yet</p>
	}
	
	if (loadedComments) {
		comments = <CommentsList comments = {loadedComments}></CommentsList>;
		
	}
	
	
	return (
		<section className = {classes.comments}>
			<h2>User Comments</h2>
			{!isAddingComment && (
				<button className = "btn"
						onClick = {startAddCommentHandler}
				>
					Add a Comment
				</button>
			)}
			{isAddingComment && errorData && errorData.status === 422 &&
				<p>{errorData.message}</p>}
			{isAddingComment && <NewCommentForm/>}
			{comments}
		</section>
	);
};

export default Comments;

export function commentsLoader({params}) {
	const {quoteId} = params;
	return getAllComments(quoteId);
}

export async function addCommentAction({
										   request,
										   params
									   }) {
	const formData = await request.formData();
	const {quoteId} = params;
	
	const postCommentData = {
		quoteId,
		commentData: {text: formData.get("comment")},
	}
	
	try {
		await addComment(postCommentData);
	} catch (err) {
		if (err.status === 422)
			return err;
		
		throw err;
	}
	
	return redirect(`/quotes/${quoteId}/comments`);
}