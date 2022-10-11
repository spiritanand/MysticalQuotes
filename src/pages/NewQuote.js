import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../hooks/use-http";
import {addQuote} from "../lib/api";

const NewQuote = () => {
	const {
			  sendRequest,
			  status
		  } = useHttp(addQuote);
	const nav = useNavigate();
	
	
	function addQuoteHandler(quoteData) {
		sendRequest(quoteData);
	}
	
	useEffect(() => {
		if (status === "completed")
			nav("/quotes");
	}, [status, nav]);
	
	
	return (
		<QuoteForm isLoadind={status} onAddQuote = {addQuoteHandler}></QuoteForm>
	);
};

export default NewQuote;
