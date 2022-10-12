import React from 'react';
import {useLoaderData} from "react-router-dom";
import QuoteList from "../components/quotes/QuoteList";
import {getAllQuotes} from "../lib/api";

const AllQuotes = () => {
	const loadedQuotes = useLoaderData();
	
	return (
		<QuoteList quotes = {loadedQuotes}></QuoteList>
	);
};

export default AllQuotes;

export function allQuotesLoader() {
	return getAllQuotes();
}
