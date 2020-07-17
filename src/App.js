import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';

// Pages
import About from './components/pages/About';

import GithubState from './context/github/GithubState';

// Styles
import './App.css';

const App = () => {
	const [alert, setAlert] = useState(null);

	// Set Alert
	const showAlertHandler = (msg, type) => {
		setAlert({ msg: msg, type: type });

		setTimeout(() => {
			setAlert(null);
		}, 3000);
	}

	// useEffect(() => {
	// 	setLoading(true);
	
	// 	axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECTRET}`)
	// 		.then((res) => {
	// 			setUsers(res.data);
	// 			setLoading(false);
	// 		});
		
	// }, []);

	return (
		<GithubState>
			<Router>
				<div className="App">
					<Navbar title="Github finder" icon="fab fa-github" />

					<div className="container">
						<Alert alert={alert} />

						<Switch>
							<Route path="/" exact render={props => (
								<Fragment>
									<Search setAlert={showAlertHandler} />
									
									<Users />
								</Fragment>
							)} />

							<Route path="/about" exact component={About} />

							<Route path="/user/:login" exact component={User}/>
						</Switch>

					</div>
				</div>
			</Router>
		</GithubState>
	);

}

export default App;
