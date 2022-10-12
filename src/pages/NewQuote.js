import React, {Fragment} from 'react';
import {
	redirect,
	useActionData
} from "react-router-dom";
import QuoteForm from "../components/quotes/QuoteForm";
import {addQuote} from "../lib/api";

const NewQuote = () => {
	const errorData = useActionData();
	
	return (
		<Fragment>
			{errorData && errorData.status &&
				<p>{errorData.message}</p>}
			<QuoteForm></QuoteForm>
		</Fragment>
	);
};

export default NewQuote;

export async function addQuoteAction({request}) {
	const formData = await request.formData();
	const postQuoteData = {
		author: formData.get("author"),
		text  : formData.get("text"),
	}
	
	try {
		await addQuote(postQuoteData);
	} catch (err) {
		if (err.status === 422)
			return err;
		
		throw err;
	}
	
	return redirect("/");
}
