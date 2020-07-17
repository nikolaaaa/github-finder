import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
    SEARCH_USERS,
    GET_USER,
    CLEAR_USERS,
    GET_REPOS,
    SET_LOADING,
    // SET_ALERT,
    // REMOVE_ALERT,
} from '../types';

const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    // Search Users
    const searchUsers = async text => {
        dispatch({ type: SET_LOADING });

        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECTRET}`);

        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items
        });

        // setClearUsers(true);
    }

    // Get User
    const getUser = async (username) => {
        dispatch({ type: SET_LOADING });

        const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECTRET}`);

        dispatch({
            type: GET_USER,
            payload: res.data
        });
    }

    // Get Repos
    const getUserRepos = async (username) => {
        dispatch({ type: SET_LOADING });

        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECTRET}`);

        dispatch({
            type: GET_REPOS,
            payload: res.data
        });
    }

    // Clear Users from search
    const onClearUsersHandler = () => dispatch({ type: CLEAR_USERS })

    return <GithubContext.Provider
        value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            searchUsers,
            onClearUsersHandler,
            getUser,
            getUserRepos
        }}
        >
            {props.children}
        </GithubContext.Provider>
}

export default GithubState;