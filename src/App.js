import React from "react";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Link,
	Navigate,
	Route,
	RouterProvider,
} from "react-router-dom";
import Comments, {
	addCommentAction,
	commentsLoader
} from "./components/comments/Comments";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import {addQuoteAction} from "./pages/NewQuote";
import {singleQuoteLoader} from "./pages/QuoteDetail";
import RootLayout from "./pages/RootLayout";
import AllQuotes, {allQuotesLoader} from "./pages/AllQuotes";
import ErrorLayout from "./pages/ErrorLayout";

// Lazy loading to optimize the code
const NewQuote = React.lazy(
	() =>
		import("./pages/NewQuote")
);
const NotFound = React.lazy(
	() =>
		import("./pages/NotFound")
);
const QuoteDetail = React.lazy(
	() =>
		import("./pages/QuoteDetail")
);

const router = createBrowserRouter(createRoutesFromElements(
	<Route path = "/"
		   element = {<RootLayout></RootLayout>}
		   errorElement = {<ErrorLayout></ErrorLayout>}
	>
		<Route
			index
			element = {
				<Navigate replace
						  to = "/quotes"
				></Navigate>
			}
		>
		</Route>
		<Route
			path = "/quotes"
			element = {<AllQuotes></AllQuotes>}
			loader = {allQuotesLoader}
		>
		</Route>
		<Route path = "/quotes/:quoteId/*"
			   element = {<QuoteDetail></QuoteDetail>}
			   loader={singleQuoteLoader}
		>
			<Route
				path = ""
				element = {
					<Link className = "btn"
						  to = "comments"
					>Comment</Link>
				}
			>
			</Route>
			<Route path = "comments"
				   element = {<Comments></Comments>}
				   loader={commentsLoader}
				   action={addCommentAction}
			>
			</Route>
		</Route>
		<Route path = "/new-quote"
			   element = {<NewQuote></NewQuote>}
			   action={addQuoteAction}
		>
		</Route>
		<Route path = "*"
			   element = {<NotFound></NotFound>}
		>
		</Route>
	</Route>
))

function App() {
	return (
		<React.Suspense fallback = {
			<div className = "centered">
				<LoadingSpinner></LoadingSpinner>
			</div>
		}
		>
			<RouterProvider router = {router}></RouterProvider>
		</React.Suspense>
	);
}

export default App;
