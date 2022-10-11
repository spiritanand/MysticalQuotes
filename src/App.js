import React, {Suspense} from "react";
import {
	Link,
	Navigate,
	Route,
	Routes,
} from "react-router-dom";
import Comments from "./components/comments/Comments";
import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import AllQuotes from "./pages/AllQuotes";

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

function App() {
	return (
		<Layout>
			<Suspense fallback = {
				<div className = "centered">
					<LoadingSpinner></LoadingSpinner>
				</div>
			}
			>
				<Routes>
					<Route
						path = "/"
						element = {<Navigate replace
											 to = "/quotes"
						></Navigate>}
					>
					</Route>
					<Route
						path = "/quotes"
						element = {<AllQuotes></AllQuotes>}
					>
					</Route>
					<Route path = "/quotes/:quoteId/*"
						   element = {<QuoteDetail></QuoteDetail>}
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
						>
						</Route>
					</Route>
					<Route path = "/new-quote"
						   element = {<NewQuote></NewQuote>}
					>
					</Route>
					<Route path = "*"
						   element = {<NotFound></NotFound>}
					>
					</Route>
				</Routes>
			</Suspense>
		</Layout>
	);
}

export default App;
