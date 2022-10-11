import {
	useCallback,
	useEffect,
	useState
} from 'react';
import {useParams} from "react-router-dom";
import useHttp from "../../hooks/use-http";
import {getAllComments} from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

import classes from './Comments.module.css';
import CommentsList from "./CommentsList";
import NewCommentForm from './NewCommentForm';

const Comments = () => {
	const [isAddingComment, setIsAddingComment] = useState(false);
	const params = useParams();
	const quoteId = params.quoteId;
	const {
			  sendRequest,
			  status,
			  data: loadedComments
		  } = useHttp(getAllComments);
	
	
	const startAddCommentHandler = () => {
		setIsAddingComment(true);
	};
	
	const addCommentHandler = useCallback(
		() => {
			sendRequest(quoteId);
		},
		[
			sendRequest,
			quoteId
		],
	);
	
	
	useEffect(() => {
		sendRequest(quoteId);
	}, [
		sendRequest,
		quoteId
	]);
	
	let comments;
	
	if (status === "pending") {
		comments = (
			<div className = "centered">
				<LoadingSpinner></LoadingSpinner>
			</div>
		);
	}
	
	if (status === "completed" && (!loadedComments || loadedComments.length === 0)) {
		comments = <p className = "centered focused">No comments added yet</p>
	}
	
	if (status === "completed" && loadedComments) {
		comments = <CommentsList comments = {loadedComments}></CommentsList>
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
			{isAddingComment && <NewCommentForm quoteId = {quoteId}
												onAddComment = {addCommentHandler}
			/>}
			{comments}
		</section>
	);
};

export default Comments;
