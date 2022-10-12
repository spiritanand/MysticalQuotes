import React from 'react';
import {
	Link,
	Outlet,
	useLoaderData,
} from "react-router-dom";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import {getSingleQuote} from "../lib/api";

const QuoteDetail = () => {
	const loadedQuote = useLoaderData();
	
	if (!loadedQuote.text) {
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

export function singleQuoteLoader({params}) {
	const {quoteId} = params;
	return getSingleQuote(quoteId);
}