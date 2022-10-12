import {useRouteError} from "react-router-dom";
import MainNavigation from "../components/layout/MainNavigaton";
import React, {Fragment} from 'react';

const ErrorLayout = (props) => {
	const error = useRouteError();
	
	return (
		<Fragment>
			<MainNavigation></MainNavigation>
			<main>
				<div className = "centered">
					<h1>Error</h1>
				</div>
				<div className = "centered">
					<h3>{error.message}</h3>
				</div>
			</main>
		</Fragment>
	);
};

export default ErrorLayout;
