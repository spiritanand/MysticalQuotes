import React, {useEffect} from 'react';
import {
	Link,
	Outlet,
	useParams,
} from "react-router-dom";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import {getSingleQuote} from "../lib/api";

const QuoteDetail = () => {
	const params = useParams();
	const quoteId = params.quoteId;
	
	const {
			  sendRequest,
			  data: loadedQuote,
			  status,
			  error
		  } = useHttp(getSingleQuote, true);
	
	useEffect(() => {
		sendRequest(quoteId);
	}, [
		sendRequest,
		quoteId
	]);
	
	if (status === "pending") {
		return <div className = "centered">
			<LoadingSpinner></LoadingSpinner>
		</div>
	}
	
	if (status === "error") {
		return <p className = "centered focused">{error}</p>
	}
	
	if (status === "completed" && !loadedQuote.text) {
		return <p>No quote found</p>
	}
	return (
		<div>
			<Link className = "btn"
				  to = "/"
			>Go Back</Link>
			<HighlightedQuote text = {loadedQuote.text}
							  author = {loadedQuote.author}
			></HighlightedQuote>
			<div className = "centered">
				<Outlet></Outlet>
			</div>
		</div>
	);
};

export default QuoteDetail;
