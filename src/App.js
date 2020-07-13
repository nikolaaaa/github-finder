import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';

// Pages
import About from './components/pages/About';

import axios from 'axios';

import GithubState from './context/github/GithubState';

// Styles
import './App.css';

const App = () => {
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState({});
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState(null);
	const [clearUsers, setClearUsers] = useState(false);

	// Search Github users
	const searchUsers = async text => {
		setLoading(true);

		const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECTRET}`);
		// const res = await axios.get(`https://api.github.com/search/users?q=${text}`);

		setUsers(res.data.items);
		setLoading(false);
		setClearUsers(true);
	}

	const getUser = async (username) => {
		setLoading(true);
		
		const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECTRET}`);
		// const res = await axios.get(`https://api.github.com/users/${username}`);
		
		setUser(res.data);
		setLoading(false);
	}

	// Get Users repos
	const getUserRepos = async (username) => {
		setLoading(true);

		const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECTRET}`);
		// const res = await axios.get(`https://api.github.com/users/${username}`);

		setRepos(res.data);
		setLoading(false);
	}

	// Clear Users from search
	const onClearUsersHandler = () => {
		setUsers([]);
		setLoading(false);
	}

	// Set Alert
	const showAlertHandler = (msg, type) => {
		setAlert({ msg: msg, type: type });

		setTimeout(() => {
			setAlert(null);
		}, 3000);
	}

	useEffect(() => {
		setLoading(true);
	
		axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECTRET}`)
			.then((res) => {
				setUsers(res.data);
				setLoading(false);
			});
		
	}, []);

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
									<Search
										searchUsers={searchUsers}
										clearUsers={onClearUsersHandler}
										showClear={clearUsers && users.length > 0}
										setAlert={showAlertHandler}
									/>

									<Users loading={loading} users={users} />
								</Fragment>
							)} />

							<Route path="/about" exact component={About} />

							<Route path="/user/:login" exact render={props => (
								<User
									{...props}
									getUser={getUser}
									getUserRepos={getUserRepos}
									repos={repos}
									user={user}
									loading={loading}
								/>
							)} />
						</Switch>

					</div>
				</div>
			</Router>
		</GithubState>
	);

}

export default App;
