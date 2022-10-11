import classes from "./Layout.module.css";
import React, {Fragment} from 'react';
import MainNavigation from "./MainNavigaton";

const Layout = (props) => {
	return (
		<Fragment>
			<MainNavigation></MainNavigation>
			<main  className={classes.main}>{props.children}</main>
		</Fragment>
	);
};

export default Layout;
