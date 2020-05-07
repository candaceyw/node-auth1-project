import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

import Home from './components/pages/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alerts';
import PrivateRoute from './components/routing/PrivateRoute';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';

function App() {
	return (
		<AuthState>
			<AlertState>
				<Router>
					<Fragment>
						<div className='container'>
							<Alerts />
							<Switch>
								<PrivateRoute exact path='/' component={Home} />
								<Route exact path='/register' component={Register} />
								<Route exact path='/login' component={Login} />
							</Switch>
						</div>
					</Fragment>
				</Router>
			</AlertState>
		</AuthState>
	);
}

export default App;
