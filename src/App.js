import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';

// Pages
import About from './components/pages/About';

import axios from 'axios';

// Styles
import './App.css';

class App extends Component {
	state = {
		users: [],
		user: {},
		loading: false,
		clearUsers: false,
		alert: null,
	}

	async componentDidMount() {
		this.setState({ loading: true });

		const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECTRET}`);
		// const res = await axios.get(`https://api.github.com/users`);

		this.setState({ users: res.data, loading: false });
	}

	getUser = async (username) => {
		this.setState({ loading: true });

		const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECTRET}`);

		this.setState({ users: res.data, loading: false });
	}

	// Search Github users
	searchUsers = async text => {
		this.setState({ loading: true });

		const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECTRET}`);
		// const res = await axios.get(`https://api.github.com/search/users?q=${text}`);

		this.setState({ users: res.data.items, loading: false, clearUsers: true });
	}

	// Clear Users from search
	clearUsers = () => {
		this.setState({ users: [], loading: false });
	}

	// Set Alert
	setAlert = (msg, type) => {
		this.setState({ alert: { msg: msg, type: type } });

		setTimeout(() => {
			this.setState({ alert: null });
		}, 3000);
	}

	render() {
		const { users, user, loading } = this.state; 

		return (
			<Router>
				<div className="App">
					<Navbar title="Github finder" icon="fab fa-github"/>

					<div className="container">
						<Alert alert={this.state.alert}/>

						<Switch>
							<Route path="/" exact render={props => (
								<Fragment>
									<Search
										searchUsers={this.searchUsers}
										clearUsers={this.clearUsers}
										showClear={this.state.clearUsers && users.length > 0}
										setAlert={this.setAlert}
									/>
									
									<Users loading={loading} users={users} />
								</Fragment>
							)} />

							<Route path="/about" exact component={About} />
							
							<Route path="/user/:login" exact render={props => (
								<User {...props} getUser={this.getUser} user={user} loading={loading}/>
							)}/>
						</Switch>

					</div>
				</div>
			</Router>
		)
	}
}

export default App;
