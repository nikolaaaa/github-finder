import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext';

const Search = ({ setAlert }) => {
    const githubContext = useContext(GithubContext);

    const [text, setText] = useState('');

    const onSearch = (e) => {
        setText(e.target.value);
    }
    
    const onSubmit = (e) => {
        e.preventDefault();

        if (text !== '') {
            githubContext.searchUsers(text);
            setText('');
        } else {
            setAlert('Please enter something', 'light');
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit} className="form">
                <input type="text" name="text" onChange={onSearch} value={text} placeholder="Search users..." />
                <input type="submit" value="Search" className="btn btn-dark btn-block" />
            </form>

            {githubContext.users.length > 0 && (
                <button className="btn btn-light btn-block" onClick={githubContext.onClearUsersHandler}>Clear</button>
            )}
        </div>
    )
}

Search.propTypes = {
    setAlert: PropTypes.func.isRequired,
}

export default Search
