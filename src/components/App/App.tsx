import "./App.css";
import React from "react";
import DrawerCustom from "../DrawerCustom/DrawerCustom";
import { Home } from "../Home/Home";
import { AddServiceDetail } from "../AddServiceDetail/AddServiceDetail";
import { BrowserRouter, Route, Switch } from "react-router-dom";

export const App = () => {
	return (
		<div className="App">
			<h1 style={{ color: "#323576" }}>Material-UI Drawer</h1>
			<BrowserRouter>
				<DrawerCustom />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/addservice" component={AddServiceDetail} />
				</Switch>
			</BrowserRouter>
		</div>
	);
};
