import React from 'react';
import { Route, BrowserRouter, Redirect } from 'react-router-dom';

import StudentDashboard from './Pages/studentDashboard';
import Login from './Pages/login';
import Signup from './Pages/signup';
import ReceiptDetails from "./Pages/ReceiptDetail";
import Receipt from './Pages/Receipt';
import AddReceipt from './Pages/AddReceipt';
import Side from './Sidenav'


const Routes = (props) => {
	console.log(props.token)
	if (props.token)
		return (
			<BrowserRouter >
				<div>
					<Route exact path="/" >
						<Redirect to="/dashboard" />
					</Route>
					<Route exact path="/signup" >
						<Redirect to="/dashboard" />
					</Route>
					<Route exact path="/home" component={StudentDashboard} />
					<Route exact path="/dashboard" component={Side} />
					<Route exact path="/receipt" component={Receipt} />
					<Route exact path="/addReceipt" component={AddReceipt} />
					<Route exact path="/receipt/:userId" component={ReceiptDetails} />
				</div>
			</BrowserRouter>
		)
	return (<BrowserRouter >
		<div>
			<Route exact path="/signup" component={Signup} />
			<Route exact path="/" component={Login} />
			<Route exact path="*" >
				<Redirect to="/" />
			</Route>
		</div>
	</BrowserRouter>)
};

export default Routes;
