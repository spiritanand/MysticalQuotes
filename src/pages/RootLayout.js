import {Outlet} from "react-router-dom";
import classes from "../components/layout/RootLayout.module.css";
import React, {Fragment} from 'react';
import MainNavigation from "../components/layout/MainNavigaton";

const RootLayout = (props) => {
	return (
		<Fragment>
			<MainNavigation></MainNavigation>
			<main className = {classes.main}>
				<Outlet></Outlet>
			</main>
		</Fragment>
	);
};

export default RootLayout;
